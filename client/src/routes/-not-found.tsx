import { createRoute } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import NotFoundPage from "@/pages/not-found";

export const NotFoundRoute = createRoute({
	getParentRoute: () => RootRoute,
	id: "not-found",
	component: NotFoundPage,
});
