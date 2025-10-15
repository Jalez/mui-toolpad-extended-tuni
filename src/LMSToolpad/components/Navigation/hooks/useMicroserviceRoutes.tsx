import { useMemo } from "react";
import type { ReactElement } from "react";
import { Route } from "react-router-dom";
import { useMicroserviceRegistryStore } from "../NavigationRegistry";

/**
 * Hook that generates routes from registered microservices
 * @returns Array of Route elements based on registered microservice routes
 */
export const useMicroserviceRoutes = () => {
  const { lastUpdate, microservices } = useMicroserviceRegistryStore();

  return useMemo(() => {
    const routes: ReactElement[] = [];

    console.log("microservices", microservices);

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

    return routes;
  }, [microservices, lastUpdate]);
};
