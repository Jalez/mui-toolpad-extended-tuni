/** @format */

import { Stack, Box, Divider, Typography } from "@mui/material";
import { CourseRaw } from "../../../store/useCourseStore";
import EditableText from "../../../../../Forms/Components/Editables/EditableText";
import EditableAutocomplete from "../../../../../Forms/Components/Editables/EditableAutoComplete";
import EditableImage from "../../../../../Forms/Components/Editables/EditableImage";
import EditableSelect from "../../../../../Forms/Components/Editables/EditableSelect";
import EditableNumber from "../../../../../Forms/Components/Editables/EditableNumber";

interface BasicInfoTabProps {
  formData: CourseRaw;
  setFormData: (data: CourseRaw) => void;
}

export default function BasicInfoTab({
  formData,
  setFormData,
}: BasicInfoTabProps) {
  return (
    <Box sx={{ minHeight: 0, display: "flex", flexDirection: "column" }}>
      <Stack spacing={2} sx={{ minHeight: 0 }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <EditableImage
            value={formData.image?.large}
            onChange={(value) =>
              setFormData({
                ...formData,
                image: { large: value, medium: "", thumbnail: "" },
              })
            }
          />

          <Stack spacing={2} sx={{ flex: 1 }}>
            <EditableText
              label="Course Code"
              value={formData.code}
              onChange={(value) => setFormData({ ...formData, code: value })}
            />

            <EditableText
              label="Instance"
              value={formData.instance}
              onChange={(value) =>
                setFormData({ ...formData, instance: value })
              }
            />

            <EditableText
              label="Title"
              value={formData.title}
              onChange={(value) => setFormData({ ...formData, title: value })}
            />

            <EditableText
              label="Description"
              value={formData.description}
              onChange={(value) =>
                setFormData({ ...formData, description: value })
              }
              multiline
            />

            <EditableAutocomplete
              label="Tags"
              value={formData.tags || []}
              onChange={(newTags) =>
                setFormData({ ...formData, tags: newTags })
              }
            />

            <EditableText
              label="Language"
              value={formData.language || ""}
              onChange={(value) =>
                setFormData({ ...formData, language: value })
              }
              helperText="Use ISO 639-1 code (e.g., 'en', 'fi')"
            />
          </Stack>
        </Stack>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ mb: 2 }}>
        Study Module Information
      </Typography>
      <Stack spacing={2}>
        <EditableText
          label="Module Name"
          value={formData.studyModule?.name || ""}
          onChange={(value) =>
            setFormData({
              ...formData,
              studyModule: {
                ...formData.studyModule,
                name: value,
                credits: formData.studyModule?.credits || 5,
                level: formData.studyModule?.level || "basic",
              },
            })
          }
          helperText="Name of the study module this course belongs to"
        />

        <EditableNumber
          label="Credits"
          value={formData.studyModule?.credits || 5}
          onChange={(value) =>
            setFormData({
              ...formData,
              studyModule: {
                ...formData.studyModule,
                credits: value,
                name: formData.studyModule?.name || "",
                level: formData.studyModule?.level || "basic",
              },
            })
          }
          helperText="Number of credits awarded for completing this course"
        />

        <EditableSelect
          label="Course Level"
          value={formData.studyModule?.level || "basic"}
          onChange={(value) =>
            setFormData({
              ...formData,
              studyModule: {
                ...formData.studyModule,
                level: value as "basic" | "intermediate" | "advanced",
                credits: formData.studyModule?.credits || 5,
                name: formData.studyModule?.name || "",
              },
            })
          }
          options={[
            { value: "basic", label: "Basic" },
            { value: "intermediate", label: "Intermediate" },
            { value: "advanced", label: "Advanced" },
          ]}
          helperText="The difficulty level of this course"
        />
      </Stack>
    </Box>
  );
}
