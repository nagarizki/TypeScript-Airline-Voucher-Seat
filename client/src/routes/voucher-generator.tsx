import { createFileRoute } from "@tanstack/react-router";
import VoucherGeneratorPage from "@/pages/voucher-generator";

export const Route = createFileRoute("/voucher-generator")({
	component: VoucherGeneratorPage,
});
