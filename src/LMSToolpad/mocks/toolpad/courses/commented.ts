
// function generateMockCourse(
//   id: number,
//   year: number,
//   existingCourses: CourseRawBackendData[],
//   teachers: CourseEnrollmentBackendData[],
//   preGeneratedSequence: {
//     topic: string;
//     subject: string;
//     basicCode: number;
//     level: courseLevel;
//   }
// ): CourseBackendData {
//   const { topic, subject, basicCode, level: courseLevel } = preGeneratedSequence;
//   const courseCode = `${subject}.${basicCode}${
//     courseLevel === "basic" ? "1" : courseLevel === "intermediate" ? "2" : "3"
//   }`;

//   // Cache the date calculations
//   const semester = Math.random() > 0.5 ? "spring" : "fall";
//   const courseStartDate = new Date(year, semester === "spring" ? 0 : 7);

//   // Update topic tracking
//   basicCodeOfTopic[basicCode.toString()] = topic;
//   HighestLevelOfExistingTopics[topic] = courseLevel;

//   // Force some courses to end after 2025.
//   const possiblyFutureYear =
//     year >= 2024 && Math.random() > 0.5 ? year + 2 : year;

//   // Handle prerequisites and relationships
//   const prerequisites = [];
//   if (HighestLevelOfExistingTopics[topic] === "intermediate") {
//     const previousCoursecode = `${subject}.${basicCode}1`;
//     prerequisites.push({
//       code: previousCoursecode,
//       type: "prerequisite",
//       description: "Basic concepts required for this course",
//     });
//   }
//   if (HighestLevelOfExistingTopics[topic] === "advanced") {
//     const previousCoursecode = `${subject}.${basicCode}2`;
//     prerequisites.push({
//       code: previousCoursecode,
//       type: "prerequisite",
//       description: "Intermediate concepts required for this course",
//     });
//     // Look for the previous course and add this course as continuation
//     const previousCourse = existingCourses.find(
//       (course) => course.code === previousCoursecode
//     );
//     if (previousCourse?.relationships) {
//       previousCourse.relationships.continuations.push({
//         code: courseCode,
//         type: "continues_from",
//         description: "Advanced concepts covered in this course",
//       });
//     }
//   }
//   const relationships = {
//     prerequisites: prerequisites as CourseRelationBackendData[],
//     continuations: [] as CourseRelationBackendData[],
//     alternatives: [] as CourseRelationBackendData[],
//     related: [] as CourseRelationBackendData[],
//   };

//   const study_module = {
//     name: `${subject}_module`,
//     credits: 5,
//     level:
//       courseLevel === "advanced"
//         ? "advanced"
//         : courseLevel === "basic"
//           ? "basic"
//           : ("intermediate" as courseLevel),
//     order:
//       courseLevel === "advanced" ? 3 : courseLevel === "intermediate" ? 2 : 1,
//   };

//   const diceRoll = Math.random();

//   // Deterministically set the end date based on course ID and year.
//   // Every third course is marked as completed.
//   const isCompleted = id % 3 === 0;
//   const courseEndDate = new Date(
//     isCompleted ? year - 1 : possiblyFutureYear,
//     semester === "spring" ? 5 : 11
//   );

//   // Adjust the base date for event generation.
//   // If the course is active (current) and not completed, generate events starting from tomorrow.
//   let baseDate = courseStartDate;
//   const now = new Date();
//   if (!isCompleted && now > courseStartDate && now < courseEndDate) {
//     baseDate = new Date(now.getTime() + 86400000); // 1 day from now
//   }

//   // Generate events using the (possibly adjusted) baseDate.
//   const events = {
//     lecture: Array(5)
//       .fill(null)
//       .map((_, i) =>
//         generateMockEvent(`${id}_lecture_${i}`, teachers, "lecture", baseDate)
//       ),
//     exercise: [],
//     exam: [],
//     deadline: [],
//     other: [],
//   };

//   return {
//     id: id.toString(),
//     title: `${subject} ${topic} ${courseLevel}`,
//     description: `This is a course about ${topic.toLowerCase()}`,
//     created_at: new Date(year, 0).toISOString(),
//     updated_at: new Date(year, 0).toISOString(),
//     code: courseCode,
//     instance: `${semester}-${year}`,
//     lti_login_url: `https://example.com/lti/${id}`,
//     services: ["edutest"],
//     events,
//     start_date: courseStartDate.toISOString(),
//     end_date: courseEndDate.toISOString(),
//     visibility: {
//       mode: diceRoll > 0.3 ? "public" : diceRoll > 0.5 ? "enrolled" : "private",
//       start_date: courseStartDate.toISOString(),
//       end_date: courseEndDate.toISOString(),
//     },
//     data_processing: {
//       purposes: ["course_delivery", "assessment"],
//       retention: 365,
//       third_party_processors: [],
//       special_categories: false,
//       legal_basis: "consent",
//     },
//     enrollment: {
//       start_date: courseStartDate.toISOString(),
//       end_date: new Date(
//         possiblyFutureYear,
//         semester === "spring" ? 5 : 11
//       ).toISOString(),
//       status: {
//         open: diceRoll > 0.2,
//         max_students: Math.floor(diceRoll * 150) + 50,
//       },
//     },
//     tags: ["programming", "computer science"],
//     language: languages[Math.floor(diceRoll * languages.length)],
//     relationships,
//     study_module,
//   };
// }



// function generateMockCourse(
//   id: number,
//   year: number,
//   existingCourses: CourseRawBackendData[],
//   teachers: CourseEnrollmentBackendData[],
//   preGeneratedSequence: {
//     topic: string;
//     subject: string;
//     basicCode: number;
//     level: courseLevel;
//   }
// ): CourseBackendData {
//   const {
//     topic,
//     subject,
//     basicCode,
//     level: courseLevel,
//   } = preGeneratedSequence;
//   const courseCode = `${subject}.${basicCode}${courseLevel === "basic" ? "1" : courseLevel === "intermediate" ? "2" : "3"}`;

//   // Cache the date calculations
//   const semester = Math.random() > 0.5 ? "spring" : "fall";
//   const baseDate = new Date(year, semester === "spring" ? 0 : 7);

//   // Update topic tracking
//   basicCodeOfTopic[basicCode.toString()] = topic;
//   HighestLevelOfExistingTopics[topic] = courseLevel;

//   // Force some courses to end after 2025.
//   const possiblyFutureYear =
//     year >= 2024 && Math.random() > 0.5 ? year + 2 : year;

//   const prerequisites = [];
//   if (HighestLevelOfExistingTopics[topic] === "intermediate") {
//     const previousCoursecode = `${subject}.${basicCode}1`;
//     prerequisites.push({
//       code: previousCoursecode,
//       type: "prerequisite",
//       description: "Basic concepts required for this course",
//     });
//   }
//   if (HighestLevelOfExistingTopics[topic] === "advanced") {
//     const previousCoursecode = `${subject}.${basicCode}2`;
//     prerequisites.push({
//       code: previousCoursecode,
//       type: "prerequisite",
//       description: "Intermediate concepts required for this course",
//     });
//     //Look for the previous course and add this course as continuation
//     const previousCourse = existingCourses.find(
//       (course) => course.code === previousCoursecode
//     );
//     if (previousCourse?.relationships) {
//       previousCourse.relationships.continuations.push({
//         code: courseCode,
//         type: "continues_from",
//         description: "Advanced concepts covered in this course",
//       });
//     }
//   }

//   // Add relationships based on subject and level
//   const relationships = {
//     prerequisites: prerequisites as CourseRelationBackendData[],
//     continuations: [] as CourseRelationBackendData[],
//     alternatives: [] as CourseRelationBackendData[],
//     related: [] as CourseRelationBackendData[],
//   };

//   const study_module = {
//     name: `${subject}_module`,
//     credits: 5,
//     level:
//       courseLevel === "advanced"
//         ? "advanced"
//         : courseLevel === "basic"
//           ? "basic"
//           : ("intermediate" as courseLevel),
//     order:
//       courseLevel === "advanced" ? 3 : courseLevel === "intermediate" ? 2 : 1,
//   };
//   const diceRoll = Math.random();

//   // Deterministically set the end date based on course ID and year
//   // This ensures we have a mix of completed and active courses
//   const isCompleted = id % 3 === 0; // Every third course will be completed
//   const endDate = new Date(
//     isCompleted ? year - 1 : possiblyFutureYear,
//     semester === "spring" ? 5 : 11
//   );

//   return {
//     id: id.toString(),
//     title: `${subject} ${topic} ${courseLevel}`,
//     description: `This is a course about ${topic.toLowerCase()}`,
//     created_at: new Date(year, 0).toISOString(),
//     updated_at: new Date(year, 0).toISOString(),
//     code: courseCode,
//     instance: `${semester}-${year}`,
//     lti_login_url: `https://example.com/lti/${id}`,
//     services: ["edutest"],
//     events: {
//       lecture: Array(5)
//         .fill(null)
//         .map((_, i) =>
//           generateMockEvent(`${id}_lecture_${i}`, teachers, "lecture", baseDate)
//         ),
//       exercise: [],
//       exam: [],
//       deadline: [],
//       other: [],
//     },
//     start_date: new Date(year, semester === "spring" ? 0 : 7).toISOString(),
//     end_date: endDate.toISOString(),
//     visibility: {
//       mode: diceRoll > 0.3 ? "public" : diceRoll > 0.5 ? "enrolled" : "private",
//       start_date: new Date(year, semester === "spring" ? 0 : 7).toISOString(),
//       end_date: endDate.toISOString(),
//     },
//     data_processing: {
//       purposes: ["course_delivery", "assessment"],
//       retention: 365,
//       third_party_processors: [],
//       special_categories: false,
//       legal_basis: "consent",
//     },
//     enrollment: {
//       start_date: new Date(year, semester === "spring" ? 0 : 7).toISOString(),
//       end_date: new Date(
//         possiblyFutureYear,
//         semester === "spring" ? 5 : 11
//       ).toISOString(),
//       status: {
//         open: diceRoll > 0.2,
//         max_students: Math.floor(diceRoll * 150) + 50,
//       },
//     },
//     tags: ["programming", "computer science"],
//     language: languages[Math.floor(diceRoll * languages.length)],
//     relationships,
//     study_module,
//   };
// }