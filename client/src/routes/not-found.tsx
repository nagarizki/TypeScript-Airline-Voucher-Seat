import { Route } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import NotFoundPage from "@/pages/not-found";

export const NotFoundRoute = new Route({
  getParentRoute: () => RootRoute,
  path: "*",
  component: NotFoundPage,
});
