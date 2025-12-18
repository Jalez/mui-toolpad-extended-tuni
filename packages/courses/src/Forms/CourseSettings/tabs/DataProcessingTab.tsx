/** @format */

import Grid from "@mui/material/Grid";
import { Stack, Typography, Divider } from "@mui/material";
import { CourseRaw } from "../../../store/useCourseStore";
import { EditableSwitch, EditableNumber, EditableSelect } from "mui-toolpad-extended-tuni";

interface DataProcessingTabProps {
  formData: CourseRaw;
  setFormData: (data: CourseRaw) => void;
}

/**
 * DataProcessingTab Component
 *
 * @version 3.0.0
 * @breaking-changes
 * - Updated component import paths to feature-based structure
 * - Enhanced type safety for data processing options
 * - Standardized string literals for legal bases
 * - Improved default value handling
 * - Added proper type definitions for processing settings
 *
 * Provides interface for:
 * - Setting data processing legal basis
 * - Managing special category data handling
 * - Configuring retention periods
 * - Setting data processing purposes
 */
export default function DataProcessingTab({
  formData,
  setFormData,
}: DataProcessingTabProps) {
  // Initialize dataProcessing if it doesn't exist
  const ensuredFormData = {
    ...formData,
    dataProcessing: formData.dataProcessing || {
      purposes: ["course_delivery", "assessment"],
      retention: 365,
      thirdPartyProcessors: [],
      specialCategories: false,
      legalBasis: "consent" as const,
    },
  };

  const handleDataProcessingUpdate = (key: string, value: any) => {
    setFormData({
      ...ensuredFormData,
      dataProcessing: {
        ...ensuredFormData.dataProcessing,
        [key]: value,
      },
    });
  };

  // Use ensuredFormData instead of formData
  return (
    <Stack spacing={3}>
      <Typography variant="h6">Data Processing Details</Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <EditableSelect
            label="Legal Basis"
            value={ensuredFormData.dataProcessing.legalBasis}
            onChange={(value) =>
              handleDataProcessingUpdate("legalBasis", value)
            }
            options={[
              { value: "consent", label: "Consent" },
              { value: "contract", label: "Contract" },
              { value: "legal_obligation", label: "Legal Obligation" },
              { value: "legitimate_interests", label: "Legitimate Interests" },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <EditableNumber
            label="Data Retention Period (days)"
            value={ensuredFormData.dataProcessing.retention}
            onChange={(value) => handleDataProcessingUpdate("retention", value)}
          />
        </Grid>
      </Grid>

      <Divider />

      <Typography variant="h6">Special Categories of Personal Data</Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <EditableSwitch
            label="Process Special Categories of Personal Data"
            value={ensuredFormData.dataProcessing.specialCategories}
            onChange={(value) =>
              handleDataProcessingUpdate("specialCategories", value)
            }
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
