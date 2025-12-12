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
import { useUserStore } from "../../../store/useUserStore";
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
  const { user } = useUserStore();
  const { setOpenDialog } = useDialogStore();

  if (!user?.platformRoles.includes("admin")) return null;

  const handleOpenPlatformSettings = () => {
    console.log("Open Platform Settings");
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
