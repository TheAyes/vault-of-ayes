import { ThemeProvider } from "@emotion/react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/react";
import "../src/global.scss";
import theme from "../src/themes/dark";

const preview: Preview = {
	decorators: [
		withThemeFromJSXProvider<ReactRenderer>({
			defaultTheme: "dark",
			themes: {
				dark: theme
			},
			Provider: ThemeProvider
		})
	],
	parameters: {
		layout: "centered",
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	}
};

export default preview;
