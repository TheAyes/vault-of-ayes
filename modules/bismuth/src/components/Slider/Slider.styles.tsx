import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { TTheme } from "../../themes/themeDef";
import type { ISlider } from "./Slider.root";
import { ArkSlider } from "./Slider.root";

export const StyledSlider = styled(ArkSlider.Root)<Partial<ISlider>>(() => {
	// @ts-ignore // Todo: Remove this if theme isn't used or is referenced.
	const theme = useTheme() as TTheme;

	return css({
		display: "flex",
		alignItems: "center",
		gap: "1rem",

		"& > span[data-part='value-text']": {
			textAlign: "right",
			width: "3em"
		},

		"& > div[data-part='control']": {
			height: "0.75rem",
			display: "flex",
			alignItems: "center",
			width: "5em",

			borderRadius: theme.borderRadius.infinite,

			"& > div[data-part='track']": {
				width: "100%",
				height: "100%",
				background: theme.colors.component.primaryBackgroundColor,

				borderRadius: "inherit",

				"& > div[data-part='range']": {
					height: "inherit",
					borderRadius: "inherit",

					background: theme.colors.component.secondaryColor
				}
			},

			"& > div[data-part='thumb']": {
				aspectRatio: "1/1",
				height: "180%",

				background: theme.colors.component.primaryColor,

				borderRadius: "inherit"
			}
		},

		"& > label[data-part=label]": {
			minWidth: 0,
			flex: "1 0 max-content"
		}
	});
});
