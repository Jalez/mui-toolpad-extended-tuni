import { Stack } from "@mui/material";
import { ToolbarActions } from "@toolpad/core";

export function CustomActions() {
    return (
      <Stack direction='row' alignItems='center' spacing={2}>
        {/* <DevelopmentTools /> */}
        <ToolbarActions />
        {/* <Tooltip title='Connected to production'>
          <CheckCircleIcon color='success' fontSize='small' />
        </Tooltip> */}
      </Stack>
    );
  }
  