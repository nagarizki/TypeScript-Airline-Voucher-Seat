import { createFileRoute } from "@tanstack/react-router";
import UserGuide from "../pages/user-guide";

export const Route = createFileRoute("/user-guide")({
	component: UserGuide,
});
