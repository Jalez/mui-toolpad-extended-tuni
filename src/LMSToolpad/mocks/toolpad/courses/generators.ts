/** @format */

import {
  courseEventType,
  courseLevel,
  courseRole,
  enrollmentStatus,
} from "../../../components/Courses/store/useCourseStore";
import { UserBackendData } from "../users/types";
import { subjectTopics } from "./constants";
import {
  CourseBackendData,
  CourseEnrollmentBackendData,
  CourseEventBackendData,
  CourseRawBackendData,
  CourseRelationBackendData,
} from "./types";

// Add this helper function at the top
function preGenerateTopicSequences(totalCourses: number) {
  const sequences: Array<{
    topic: string;
    subject: string;
    basicCode: number;
    level: courseLevel;
  }> = [];
  const subjects = Object.keys(subjectTopics);

  let basicCodeCounter = 1;
  while (sequences.length < totalCourses) {
    const subject = subjects[basicCodeCounter % subjects.length];
    const topics = subjectTopics[subject as keyof typeof subjectTopics];
    const topic = topics[basicCodeCounter % topics.length];

    sequences.push(
      { topic, subject, basicCode: basicCodeCounter, level: "basic" },
      { topic, subject, basicCode: basicCodeCounter, level: "intermediate" },
      { topic, subject, basicCode: basicCodeCounter, level: "advanced" }
    );
    basicCodeCounter++;
  }
  return sequences;
}

function generateMockEvent(
  id: string,
  teachers: CourseEnrollmentBackendData[],
  type: courseEventType,
  baseDate: Date
): CourseEventBackendData {
  return {
    id,
    type,
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Session`,

    start_time: new Date(
      baseDate.getTime() + Math.random() * 864000000
    ).toISOString(),
    end_time: new Date(
      baseDate.getTime() + Math.random() * 864000000
    ).toISOString(),
    location: "Online",
    teachers: teachers as CourseEnrollmentBackendData[],
    recurring: {
      frequency: "weekly",
      until: new Date(baseDate.getTime() + 864000000 * 10).toISOString(),
    },
  };
}

//Let use this to ensure we always start from basic course and end with advanced course
//Example format: { 'Programming': 'basic' } if we get another Programming course, we will update the level to intermediate
type HighestLevelOfExistingTopicsType = {
  [key: string]: courseLevel;
};

//Lets ensure the basicCode is unique and
const basicCodeOfTopic: { [key: string]: string } = {};
const HighestLevelOfExistingTopics: HighestLevelOfExistingTopicsType = {};
const languages = ["en", "fi", "sv", "de", "fr", "es", "it", "ru", "zh", "ja"];

function generateMockCourse(
  id: number,
  year: number,
  existingCourses: CourseRawBackendData[],
  teachers: CourseEnrollmentBackendData[],
  preGeneratedSequence: {
    topic: string;
    subject: string;
    basicCode: number;
    level: courseLevel;
  }
): CourseBackendData {
  const {
    topic,
    subject,
    basicCode,
    level: courseLevel,
  } = preGeneratedSequence;
  const courseCode = `${subject}.${basicCode}${courseLevel === "basic" ? "1" : courseLevel === "intermediate" ? "2" : "3"}`;

  // Cache the date calculations
  const semester = Math.random() > 0.5 ? "spring" : "fall";
  const baseDate = new Date(year, semester === "spring" ? 0 : 7);

  // Update topic tracking
  basicCodeOfTopic[basicCode.toString()] = topic;
  HighestLevelOfExistingTopics[topic] = courseLevel;

  // Force some courses to end after 2025.
  const possiblyFutureYear =
    year >= 2024 && Math.random() > 0.5 ? year + 2 : year;

  const prerequisites = [];
  if (HighestLevelOfExistingTopics[topic] === "intermediate") {
    const previousCoursecode = `${subject}.${basicCode}1`;
    prerequisites.push({
      code: previousCoursecode,
      type: "prerequisite",
      description: "Basic concepts required for this course",
    });
  }
  if (HighestLevelOfExistingTopics[topic] === "advanced") {
    const previousCoursecode = `${subject}.${basicCode}2`;
    prerequisites.push({
      code: previousCoursecode,
      type: "prerequisite",
      description: "Intermediate concepts required for this course",
    });
    //Look for the previous course and add this course as continuation
    const previousCourse = existingCourses.find(
      (course) => course.code === previousCoursecode
    );
    if (previousCourse?.relationships) {
      previousCourse.relationships.continuations.push({
        code: courseCode,
        type: "continues_from",
        description: "Advanced concepts covered in this course",
      });
    }
  }

  // Add relationships based on subject and level
  const relationships = {
    prerequisites: prerequisites as CourseRelationBackendData[],
    continuations: [] as CourseRelationBackendData[],
    alternatives: [] as CourseRelationBackendData[],
    related: [] as CourseRelationBackendData[],
  };

  const study_module = {
    name: `${subject}_module`,
    credits: 5,
    level:
      courseLevel === "advanced"
        ? "advanced"
        : courseLevel === "basic"
          ? "basic"
          : ("intermediate" as courseLevel),
    order:
      courseLevel === "advanced" ? 3 : courseLevel === "intermediate" ? 2 : 1,
  };
  const diceRoll = Math.random();

  // Deterministically set the end date based on course ID and year
  // This ensures we have a mix of completed and active courses
  const isCompleted = id % 3 === 0; // Every third course will be completed
  const endDate = new Date(
    isCompleted ? year - 1 : possiblyFutureYear,
    semester === "spring" ? 5 : 11
  );

  return {
    id: id.toString(),
    title: `${subject} ${topic} ${courseLevel}`,
    description: `This is a course about ${topic.toLowerCase()}`,
    created_at: new Date(year, 0).toISOString(),
    updated_at: new Date(year, 0).toISOString(),
    code: courseCode,
    instance: `${semester}-${year}`,
    lti_login_url: `https://example.com/lti/${id}`,
    services: ["edutest"],
    events: {
      lecture: Array(5)
        .fill(null)
        .map((_, i) =>
          generateMockEvent(`${id}_lecture_${i}`, teachers, "lecture", baseDate)
        ),
      exercise: [],
      exam: [],
      deadline: [],
      other: [],
    },
    start_date: new Date(year, semester === "spring" ? 0 : 7).toISOString(),
    end_date: endDate.toISOString(),
    visibility: {
      mode: diceRoll > 0.3 ? "public" : diceRoll > 0.5 ? "enrolled" : "private",
      start_date: new Date(year, semester === "spring" ? 0 : 7).toISOString(),
      end_date: endDate.toISOString(),
    },
    data_processing: {
      purposes: ["course_delivery", "assessment"],
      retention: 365,
      third_party_processors: [],
      special_categories: false,
      legal_basis: "consent",
    },
    enrollment: {
      start_date: new Date(year, semester === "spring" ? 0 : 7).toISOString(),
      end_date: new Date(
        possiblyFutureYear,
        semester === "spring" ? 5 : 11
      ).toISOString(),
      status: {
        open: diceRoll > 0.2,
        max_students: Math.floor(diceRoll * 150) + 50,
      },
    },
    tags: ["programming", "computer science"],
    language: languages[Math.floor(diceRoll * languages.length)],
    relationships,
    study_module,
  };
}

//Randomly enroll some of the users. Make some students, some teachers
const createEnrollment = (
  user: UserBackendData,
  role: courseRole,
  courseId: string,
  forcedStatus?: enrollmentStatus
): CourseEnrollmentBackendData => {
  const statusOptions: enrollmentStatus[] = ["enrolled", "pending", "rejected"];
  return {
    user_id: user.id,
    name: user.name,
    email: user.email,
    role,
    course_id: courseId,
    status:
      forcedStatus ||
      statusOptions[Math.floor(Math.random() * statusOptions.length)],
  };
};

export function generateCourses(config: {
  coursesPerYear: number;
  startYear: number;
  numberOfYears: number;
  users: UserBackendData[];
}): {
  courses: CourseBackendData[];
  enrollmentsByCourse: { [key: string]: CourseEnrollmentBackendData[] };
} {
  if (config.users.length === 0) {
    throw new Error("No users provided");
  }
  const courses: CourseBackendData[] = [];
  const enrollmentsByCourse: { [key: string]: CourseEnrollmentBackendData[] } =
    {};

  const totalCourses = config.coursesPerYear * config.numberOfYears;
  const preGeneratedSequences = preGenerateTopicSequences(totalCourses);

  // Instead of using modulo 20, let's create dedicated teacher and student assignments
  const firstUser = config.users[0];
  const otherUsers = config.users.slice(1);
  const teacherIndices = otherUsers
    .map((_, index) => index)
    .filter((index) => index % 20 === 0);

  for (let year = 0; year < config.numberOfYears; year++) {
    const currentYear = config.startYear + year;
    for (let i = 0; i < config.coursesPerYear; i++) {
      const courseIndex = year * config.coursesPerYear + i;
      const sequence = preGeneratedSequences[courseIndex];

      // Determine if first user participates in this course at all
      const firstUserParticipates = Math.random() > 0.3; // 70% chance of participation

      let firstUserEnrollment;
      if (firstUserParticipates) {
        // Determine role and status with more variation
        const firstUserRole: courseRole =
          Math.random() > 0.7 ? "teacher" : "student";

        // More varied enrollment status based on patterns
        let enrollmentStatus: enrollmentStatus;
        const statusRoll = Math.random();
        if (statusRoll < 0.6) {
          // 60% chance of being enrolled
          enrollmentStatus = "enrolled";
        } else if (statusRoll < 0.8) {
          // 20% chance of pending
          enrollmentStatus = "pending";
        } else {
          // 20% chance of rejected
          enrollmentStatus = "rejected";
        }

        firstUserEnrollment = createEnrollment(
          firstUser,
          firstUserRole,
          (courseIndex + 1).toString(),
          enrollmentStatus
        );
      }

      // Get other teachers
      const otherTeachers = teacherIndices.map((index) =>
        createEnrollment(
          otherUsers[index],
          "teacher",
          (courseIndex + 1).toString(),
          "enrolled"
        )
      );

      // Combine teachers based on first user's participation and role
      const teachersOfCourse =
        firstUserEnrollment?.role === "teacher"
          ? [firstUserEnrollment, ...otherTeachers]
          : otherTeachers;

      // Generate the course
      const course = generateMockCourse(
        courseIndex + 1,
        currentYear,
        courses,
        teachersOfCourse,
        sequence
      );
      courses.push(course);

      // Create student enrollments with more variation
      const studentEnrollments = otherUsers
        .filter((_, idx) => idx % 20 !== 0) // Not a regular teacher
        .filter((_, __) => Math.random() > 0.4) // Only 60% chance of attempting enrollment
        .map((user) => {
          const statusRoll = Math.random();
          let status: enrollmentStatus;
          if (statusRoll < 0.7) {
            status = "enrolled";
          } else if (statusRoll < 0.9) {
            status = "pending";
          } else {
            status = "rejected";
          }
          return createEnrollment(
            user,
            "student",
            (courseIndex + 1).toString(),
            status
          );
        });

      // Combine all enrollments
      enrollmentsByCourse[(courseIndex + 1).toString()] = [
        ...teachersOfCourse,
        ...(firstUserEnrollment?.role === "student"
          ? [firstUserEnrollment]
          : []),
        ...studentEnrollments,
      ];
    }
  }

  return { courses, enrollmentsByCourse };
}

// Generate a large set of courses
