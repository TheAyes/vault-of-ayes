import { TTheme } from "../themeDef.ts";

const theme: TTheme = {
	typography: {
		fontFamily: "'Roboto', sans-serif",
		fontSize: "16px",
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700
	},
	colors: {
		primary: "#5544cc",
		secondary: "#cc2020",

		background: "#101032",
		paper: "#212443",

		separator: "303040",

		success: "#00aa00",
		error: "#ff0000",
		info: "#9999ff",
		warn: "#dada00",

		component: {
			primaryColor: "#ccddff",
			secondaryColor: "#0066aa",
			tertiaryColor: "#003388",

			primaryBackgroundColor: "#323254",
			secondaryBackgroundColor: "#212143",
			tertiaryBackgroundColor: "#101032",

			border: {
				style: "solid",
				width: "2px",
				color: "#ccddff"
			}
		},

		button: {
			color: "#aaaaff",
			hoveredColor: "#000000",
			activeColor: "#000000"
		},

		toggle: {
			color: "#ccddff",
			disabled: "#101032",
			enabled: "#0066aa"
		}
	},
	borderRadius: {
		small: 4,
		normal: 8,
		large: 14,
		infinite: Number.MAX_VALUE
	},
	transition: {
		background: {
			duration: "200ms"
		}
	}
};

export default theme;
