import { createFileRoute } from "@tanstack/react-router";
import SeatListPage from "@/pages/index";

export const Route = createFileRoute("/")({
	component: SeatListPage,
});
