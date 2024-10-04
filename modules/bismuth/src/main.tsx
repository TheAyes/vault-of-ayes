import { ThemeProvider } from "@emotion/react";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ComponentPreviews, useInitial } from "./dev";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./global.scss";
import theme from "./themes/dark";

// Create a new router instance
export const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = createRoot(rootElement);
	root.render(
		<StrictMode>
			<ThemeProvider theme={theme}>
				<DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
					<RouterProvider router={router} />
				</DevSupport>
			</ThemeProvider>
		</StrictMode>
	);
}
