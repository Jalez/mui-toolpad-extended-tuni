/** @format */
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Fade,
  CardActionArea,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { NavigationPageStoreItem } from '../store/useNavigationStore';
import { SvgIconComponent } from "@mui/icons-material";

export type ToolSelectorItem = {
  path: string;
  icon: JSX.Element;
  label: string;
  description: string;
  forRoles?: string[];
};

type ToolSelectorProps = {
  show: boolean;
  title: string;
  navigationItems?: ToolSelectorItem[];
  navItems?: NavigationPageStoreItem[];
  roleCheck?: boolean;
};

const ToolSelector = ({ show, title, navigationItems, navItems, roleCheck }: ToolSelectorProps) => {
  const { user } = useUserStore();

  const convertedItems: ToolSelectorItem[] = navItems 
    ? navItems
        .filter((item): item is NavigationPageStoreItem => 
          item.kind === "page" && !!item.metadata?.isRootTool)
        .map(item => {
          const IconComponent = item.iconFC as SvgIconComponent;
          return {
            path: `${item.segment}`,
            icon: IconComponent ? <IconComponent fontSize="large" /> : <></>,
            label: item.title,
            description: item.metadata?.description || "",
            forRoles: item.metadata?.forRoles
          };
        })
    : navigationItems || [];

  return (
    <Box sx={{ p: 3 }} data-testid='tool-selector'>
      <Fade in={show} timeout={500}>
        <Box>
          <Typography variant='h5' sx={{ mb: 4, color: 'primary.main' }}>
            {title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'stretch',
              justifyContent: 'center',
              height: 'fit-content',
              width: '100%',
              gap: 4,
            }}>
            {convertedItems.map((item) => (
              !roleCheck || (roleCheck && item.forRoles?.includes(user?.role || '')) ? (
                <ToolCard key={item.path} item={item} />
              ) : null
            ))}
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

type ToolCardProps = {
  item: ToolSelectorItem;
};

const ToolCard = ({ item }: ToolCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Card
      data-testid='tool-card'
      sx={{
        height: 'auto',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'stretch',
        transition: 'all 0.2s ease-in-out',
        transform: 'scale(1)',
        bgcolor: 'background.paper',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: theme.shadows[8],
          bgcolor: (theme) => theme.palette.primary.main + '20',
          color: 'primary.main',
        },
      }}>
      <CardActionArea
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'top',
        }}
        onClick={() => navigate(item.path)}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            p: 3,
            maxWidth: 300,
            flex: 1,
          }}>
          <Box
            sx={{
              color: 'inherit',
            }}>
            {item.icon}
          </Box>
          <Typography variant='h6'>{item.label}</Typography>
          <Typography variant='body2' color='text.secondary' align='center'>
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ToolSelector;
