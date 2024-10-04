import { Preview } from "@storybook/react";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "../main.tsx";

export const withTanstackRouter!: Preview["decorators"] = (Story, context) => (
	<RouterProvider router={router} defaultComponent={() => <Story {...context} />} />
);
