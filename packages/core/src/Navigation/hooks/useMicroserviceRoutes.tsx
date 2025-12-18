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
        const providerRoutes = provider();
        routes.push(...providerRoutes);
      } catch (error) {
        console.error(`Error getting routes from route provider "${id}":`, error);
      }
    });

    return routes;
  }, [microservices, routeProviders, lastUpdate]);
};
