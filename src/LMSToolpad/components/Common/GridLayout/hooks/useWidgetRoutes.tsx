import { JSX, useMemo } from "react";
import { Route } from "react-router-dom";
import { useWidgetRegistryStore } from "../WidgetRegistry";

/**
 * Hook that generates routes from registered widgets
 * @returns Array of Route elements based on registered widget routes
 */
export const useWidgetRoutes = () => {
  const { lastUpdate, widgets } = useWidgetRegistryStore();

  return useMemo(() => {
    const routes: JSX.Element[] = [];

    widgets.forEach((widget) => {
      if (widget.metadata?.route) {
        routes.push(
          <Route
            key={widget.metadata.route.path}
            path={widget.metadata.route.path}
            element={
              widget.metadata.route.element || (
                <widget.Component {...widget.props} />
              )
            }
            index={widget.metadata.route.index}
          />
        );
      }
    });

    return routes;
  }, [widgets, lastUpdate]);
};
