/** @format */

import ChatIcon from '@mui/icons-material/Chat';
import HelpIcon from '@mui/icons-material/Help';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import PeopleIcon from '@mui/icons-material/People';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import SmartToyIcon from '@mui/icons-material/SmartToy';
type iconByType = {
  [key: string]: React.ReactNode;
};
export const iconByType: iconByType = {
  edit: <EditIcon />,
  chat: <ChatIcon />,
  help: <HelpIcon />,
  stats: <AssessmentIcon />,
  reports: <ReportGmailerrorredIcon />,
  contact: <ContactPageIcon />,
  logout: <LogoutIcon />,
  instructions: <DashboardIcon />,
  chatbot: <SmartToyIcon />,
  'es-manager': <PeopleIcon />,
};
