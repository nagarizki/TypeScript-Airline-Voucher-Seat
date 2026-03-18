import { createFileRoute } from "@tanstack/react-router";
import SeatAssignmentPage from "@/pages/seat-assignment";

export const Route = createFileRoute("/seat-assignment")({
	component: SeatAssignmentPage,
});