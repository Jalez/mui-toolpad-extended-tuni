/** @format */

import { useLocation, useNavigate } from "react-router-dom";

function useCustomRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: navigate,
  };
}

export default useCustomRouter;
