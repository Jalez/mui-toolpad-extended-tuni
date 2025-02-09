/** @format */

import { useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import useCourseStore from "./store/useCourseStore";
import { useNotificationStore } from "../Notifications/store/useNotificationsStore";

const LtiLoginUrlForm = () => {
  const { currentCourse, updateStateCourse } = useCourseStore();
  const { addNotificationData } = useNotificationStore();
  const [ltiLoginUrl, setLtiLoginUrl] = useState(
    currentCourse?.ltiLoginUrl || ""
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentCourse) return;

    const trimmedUrl = ltiLoginUrl.trim();
    if (!trimmedUrl) {
      addNotificationData({
        type: "error",
        message: "Please provide a valid URL",
      });
      return;
    }

    setLoading(true);
    try {
      const updatedCourse = await updateStateCourse({
        ...currentCourse,
        ltiLoginUrl: trimmedUrl,
      });

      // Verify the update was successful
      if (updatedCourse.ltiLoginUrl === trimmedUrl) {
        addNotificationData({
          type: "success",
          message: "LTI Login URL updated successfully.",
        });
      } else {
        throw new Error("Failed to verify update");
      }
    } catch (error) {
      console.error("Failed to update LTI Login URL:", error);
      addNotificationData({
        type: "error",
        message: "Failed to update LTI Login URL. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mt: 4,
        mx: "auto",
        maxWidth: 600,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h6" color="primary" gutterBottom sx={{ mb: 2 }}>
        Update LTI Login URL
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Please provide the LTI Login URL for this course. Students will be
        redirected to this URL when they need to authenticate.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="LTI Login URL"
          variant="outlined"
          fullWidth
          required
          value={ltiLoginUrl}
          onChange={(e) => setLtiLoginUrl(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
            },
          }}
          helperText="The URL where students will be redirected for LTI authentication"
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{
              px: 4,
              py: 1,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            {loading ? "Updating..." : "Update URL"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default LtiLoginUrlForm;
