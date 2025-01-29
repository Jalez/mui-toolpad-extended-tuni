/** @format */

import { useLocation } from 'react-router-dom';
import useToolbarStore from '../../../store/useToolbarStore';
import { getToolbar } from './toolbarRegistry';
import DefaultToolbar from './DefaultToolbar';

const PageToolbar = () => {
  const location = useLocation();
  const { currentToolbar } = useToolbarStore();

  const ToolbarComponent = currentToolbar
    ? getToolbar(currentToolbar)
    : getToolbar(location.pathname) || DefaultToolbar;

  if (!ToolbarComponent) return <DefaultToolbar />;

  return <ToolbarComponent />;
};

export default PageToolbar;
