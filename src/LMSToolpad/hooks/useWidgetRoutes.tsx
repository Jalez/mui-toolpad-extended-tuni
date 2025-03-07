import { useMemo } from "react";
import type { ReactElement } from "react";
import { Route } from "react-router-dom";
import { useWidgetRegistryStore } from "../components/Common/GridLayout/WidgetRegistry";

/**
 * Hook that generates routes from registered widgets
 * @returns Array of Route elements based on registered widget routes
 */
export const useWidgetRoutes = () => {
  const { lastUpdate, widgets } = useWidgetRegistryStore();

  return useMemo(() => {
    const routes: ReactElement[] = [];

    console.log("widgets", widgets);

    widgets.forEach((widget) => {
      if (widget.metadata?.route) {
        const Component = widget.Component;
        routes.push(
          <Route
            key={widget.metadata.route.path}
            path={widget.metadata.route.path}
            element={
              widget.metadata.route.element || <Component {...widget.props} />
            }
            index={widget.metadata.route.index}
          />
        );
      }
    });

    return routes;
  }, [widgets, lastUpdate]);
};
