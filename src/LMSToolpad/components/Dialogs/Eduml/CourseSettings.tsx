/** @format */

// components/CourseSettingsDialog.tsx

import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import useCourseStore from "../../Courses/store/useCourseStore";
import FormDialog from "../FormDialog";
import useDialogStore from "../../../store/useDialogStore";

const CourseSettings = () => {
  const { closeDialog } = useDialogStore();
  const { currentCourse, updateStateCourse } = useCourseStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentCourse) {
      setTitle(currentCourse.title);
      setDescription(currentCourse.description);
    }
  }, [currentCourse]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentCourse) return;

    const updatedCourse = {
      ...currentCourse,
      title,
      description,
    };

    updateStateCourse(updatedCourse);
    closeDialog();
  };

  return (
    <FormDialog
      onSubmit={handleSubmit}
      title="Edit Course"
      submitText="Save Changes"
    >
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
    </FormDialog>
  );
};

export default CourseSettings;
