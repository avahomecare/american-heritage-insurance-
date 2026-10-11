import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/trucks")({
  beforeLoad: () => {
    throw redirect({ to: "/transportation" });
  },
});
