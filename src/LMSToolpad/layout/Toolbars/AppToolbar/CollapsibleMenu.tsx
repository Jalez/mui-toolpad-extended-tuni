/** @format */
import {
  IconButton,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect } from "react";
import DevelopmentTools from "../../../components/DevTools/DevelopmentTools";
import { useCurrentUser } from "../../../components/Events/hooks/useCurrentUser";
import useDialogStore from "../../../store/useDialogStore";
import { CollapsingButtons } from "../../../../common/components/ui/CollapsingButtons/CollapsingButtons";
import ThemeToggle from "../../../../common/components/ui/ThemeToggle/ThemeToggle";

export const CollapsibleMenu = () => {
  // const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  // const containerRef = useRef<HTMLDivElement>(null);
  // const expandTimeout = useRef<any>(null);

  useEffect(() => {
    // setIsExpanded(isLargeScreen);
  }, [isLargeScreen]);

  return (
    <CollapsingButtons
      fullWidth={isLargeScreen}
      collapseIcon={<MoreHorizIcon htmlColor={theme.palette.text.primary} />}
      collapseWidth={40}
      tooltipTitle="More actions"
    >
      <Stack direction="row" spacing={1}>
        <DevelopmentTools />
        <ThemeToggle />
        <PlatformSettingsOpener />
      </Stack>
    </CollapsingButtons>
  );
};

const PlatformSettingsOpener = () => {
  const { user } = useCurrentUser();
  const { setOpenDialog } = useDialogStore();

  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/c66c732d-3054-49ac-a9c8-4251e2d751a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'CollapsibleMenu.tsx:47',message:'PlatformSettingsOpener render',data:{hasUser:!!user,hasPlatformRoles:!!user?.platformRoles,platformRoles:user?.platformRoles},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'L'})}).catch(()=>{});
  // #endregion

  if (!user?.platformRoles?.includes("admin")) return null;

  const handleOpenPlatformSettings = () => {
    setOpenDialog("PlatformSettings");
  };

  return (
    <Tooltip title="Platform Settings">
      <IconButton
        onClick={handleOpenPlatformSettings}
        size="small"
        color="inherit"
      >
        <SettingsIcon />
      </IconButton>
    </Tooltip>
  );
};
