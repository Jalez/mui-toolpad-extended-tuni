/** @format */
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  CardActionArea,
  Button,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavigationPageStoreItem } from "../Navigation/store/useNavigationStore";
import { SvgIconComponent } from "@mui/icons-material";

type ToolCardProps = {
  item: NavigationPageStoreItem;
  onToggleService?: (path: string) => void;
  isUsed?: boolean; // new prop
};

const ToolCard = ({ item, onToggleService, isUsed }: ToolCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const IconComponent = item.iconFC as SvgIconComponent;
  const iconToShow = IconComponent ? <IconComponent fontSize="large" /> : null;

  return (
    <Card
      data-testid="tool-card"
      sx={{
        position: "relative",
        height: "auto",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "stretch",
        transition: "all 0.2s ease-in-out",
        transform: "scale(1)",
        bgcolor: "background.paper",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: theme.shadows[8],
          bgcolor: (theme) => theme.palette.primary.main + "20",
          color: "primary.main",
        },
        "&:hover .toggle-button": {
          display: "inline-flex",
        },
      }}
    >
      <CardActionArea
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "top",
        }}
        onClick={() => navigate(item.segment)}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            p: 3,
            maxWidth: 300,
            flex: 1,
          }}
        >
          <Box
            sx={{
              color: "inherit",
            }}
          >
            {iconToShow}
          </Box>
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {item.metadata?.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {onToggleService && (
        <Tooltip title={isUsed ? "Remove" : "Add"} arrow>
          <Button
            className="toggle-button"
            sx={{
              display: "none",
              position: "absolute",
              top: 8,
              right: 8,
              minWidth: 32,
              padding: 0,
              fontSize: "1.25rem",
            }}
            onClick={() => onToggleService(item.segment)}
          >
            {isUsed ? "-" : "+"}
          </Button>
        </Tooltip>
      )}
    </Card>
  );
};

export default ToolCard;
