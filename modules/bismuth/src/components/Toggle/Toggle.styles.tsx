import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { TTheme } from "../../themes/themeDef.ts";
import type { IToggle } from "./Toggle.root.ts";

export const StyledToggle = styled(motion.label)<Partial<IToggle>>(() => {
	// @ts-ignore // Todo: Remove this if theme isn't used or is referenced.
	const theme = useTheme() as TTheme;

	return css({
		display: "flex",
		gap: "8px",

		"& > button": {
			display: "inline-flex",
			aspectRatio: "1.6/1",

			height: "30px",
			padding: "4px",

			background: theme.colors.toggle.disabled,
			border: `2px solid ${theme.colors.toggle.color}`,
			borderRadius: theme.borderRadii.infinite,

			transition: `background ${theme.transition.background.duration} ${
				theme.transition.background.timingFunction ?? ""
			}`,

			"&.toggled": {
				background: theme.colors.toggle.enabled,
				justifyContent: "end"
			},

			"& > span": {
				aspectRatio: "1/1",
				height: "100%",
				background: `${theme.colors.toggle.color}`,
				borderRadius: "100%",
				padding: 3,

				"& > svg > path": {
					"&:nth-child(2)": {
						stroke: theme.colors.toggle.disabled
					},

					"&:nth-child(1)": {
						stroke: theme.colors.toggle.enabled
					}
				}
			}
		},

		"& > p": {}
	});
});
