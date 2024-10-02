import { CSSProperties } from "react";

type TTransition = {
	duration: CSSProperties["transitionDuration"];
	timingFunction?: CSSProperties["transitionTimingFunction"];
};

export type TTheme = {
	typography: {
		fontFamily: CSSProperties["fontFamily"];
		fontSize: CSSProperties["fontSize"];
		fontWeightLight: CSSProperties["fontWeight"];
		fontWeightRegular: CSSProperties["fontWeight"];
		fontWeightMedium: CSSProperties["fontWeight"];
		fontWeightBold: CSSProperties["fontWeight"];
	};

	colors: {
		primary: CSSProperties["color"];
		secondary: CSSProperties["color"];

		background: CSSProperties["backgroundColor"];
		paper: CSSProperties["backgroundColor"];
		separator: CSSProperties["borderColor"];

		success: CSSProperties["color"];
		warn: CSSProperties["color"];
		error: CSSProperties["color"];
		info: CSSProperties["color"];

		button: {
			color: CSSProperties["color"];
			hoveredColor: CSSProperties["color"];
			activeColor: CSSProperties["color"];
		};

		toggle: {
			color: CSSProperties["color"];
			disabled: CSSProperties["backgroundColor"];
			enabled: CSSProperties["backgroundColor"];
		};
	};

	borderRadius: {
		small: CSSProperties["borderRadius"];
		normal: CSSProperties["borderRadius"];
		large: CSSProperties["borderRadius"];
		infinite: CSSProperties["borderRadius"];
	};

	transition: {
		background: TTransition;
	};
};

export const theme: TTheme = {
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
