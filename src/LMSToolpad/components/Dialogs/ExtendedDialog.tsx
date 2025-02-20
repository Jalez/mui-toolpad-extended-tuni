/** @format */

import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode } from "react";

type CustomDialogProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

const ExtendedDialog = ({
  children,
  open,
  onClose,
  ...dialogProps
}: CustomDialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: isMobile ? "0px !important" : "14px",
          height: isMobile ? "100vh" : "90vh",
          display: "flex",
          flexDirection: "column",
          maxHeight: isMobile ? "100vh" : "90vh",
          margin: isMobile ? 0 : undefined,
        },
      }}
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      {...dialogProps}
    >
      {children}
    </Dialog>
  );
};

export default ExtendedDialog;
