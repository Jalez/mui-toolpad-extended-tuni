/** @format */

import { useLocation, useNavigate } from 'react-router-dom';

function useCustomRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: navigate,
    // navigate: (url: string, options: { history?: "replace" } = {}) => {
    //   const method = options?.history === "replace" ? "replace" : "push";
    //   navigate(url, { replace: method === "replace" });
    // },
  };
}

export default useCustomRouter;
