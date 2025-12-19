import { useMemo } from "react";
import type { ReactElement } from "react";
import { Route } from "react-router-dom";
import { useMicroserviceRegistryStore } from "../NavigationRegistry";

/**
 * Hook that generates routes from registered microservices
 * @returns Array of Route elements based on registered microservice routes
 */
export const useMicroserviceRoutes = () => {
  const { lastUpdate, microservices, routeProviders } = useMicroserviceRegistryStore();

  return useMemo(() => {
    const routes: ReactElement[] = [];
    
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/c66c732d-3054-49ac-a9c8-4251e2d751a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useMicroserviceRoutes.tsx:13',message:'useMicroserviceRoutes building routes',data:{routeProviderCount:routeProviders.size,lastUpdate},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
    // #endregion

    // Add routes from registered microservices
    microservices.forEach((microservice) => {
      if (microservice.metadata?.route) {
        const Component = microservice.Component;
        routes.push(
          <Route
            key={microservice.metadata.route.path}
            path={microservice.metadata.route.path}
            element={
              microservice.metadata.route.element || <Component {...microservice.props} />
            }
            index={microservice.metadata.route.index}
          />
        );
      }
    });

    // Add routes from route providers
    routeProviders.forEach((provider, id) => {
      try {
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/c66c732d-3054-49ac-a9c8-4251e2d751a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useMicroserviceRoutes.tsx:34',message:'Calling route provider',data:{providerId:id},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
        // #endregion
        const providerRoutes = provider();
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/c66c732d-3054-49ac-a9c8-4251e2d751a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useMicroserviceRoutes.tsx:36',message:'Route provider returned routes',data:{providerId:id,routeCount:providerRoutes.length,firstRoutePath:(providerRoutes[0] as any)?.props?.path},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
        // #endregion
        routes.push(...providerRoutes);
      } catch (error) {
        console.error(`Error getting routes from route provider "${id}":`, error);
      }
    });

    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/c66c732d-3054-49ac-a9c8-4251e2d751a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useMicroserviceRoutes.tsx:43',message:'All routes built',data:{totalRouteCount:routes.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'K'})}).catch(()=>{});
    // #endregion
    
    return routes;
  }, [microservices, routeProviders, lastUpdate]);
};
