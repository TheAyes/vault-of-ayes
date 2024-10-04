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

		component: {
			primaryColor: CSSProperties["color"];
			secondaryColor: CSSProperties["color"];
			tertiaryColor: CSSProperties["color"];

			primaryBackgroundColor: CSSProperties["backgroundColor"];
			secondaryBackgroundColor: CSSProperties["backgroundColor"];
			tertiaryBackgroundColor: CSSProperties["backgroundColor"];

			border: {
				color: CSSProperties["borderColor"];
				width: CSSProperties["borderWidth"];
				style: CSSProperties["borderStyle"];
			};
		};

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
