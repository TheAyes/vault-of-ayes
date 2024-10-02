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

			width: "3rem",
			height: "3rem",
			padding: "4px",

			background: theme.colors.toggle.disabled,
			border: `2px solid ${theme.colors.toggle.color}`,

			borderRadius: theme.borderRadius.infinite,

			transition: `background ${theme.transition.background.duration} ${
				theme.transition.background.timingFunction ?? ""
			}`,

			"& > span": {
				aspectRatio: "1/1",
				padding: 3,
				height: "100%",
				background: `${theme.colors.toggle.disabled}`,
				borderRadius: "100%",

				transition: "background-color 200ms ease-in-out"
			},

			"&.toggle": {
				".offIcon": {
					stroke: theme.colors.toggle.disabled
				},

				".onIcon": {
					stroke: theme.colors.toggle.enabled
				}
			},

			"&.checkbox": {
				svg: {
					"& > .onIcon": {
						stroke: theme.colors.toggle.enabled
					}
				}
			},

			"&.toggled": {
				background: theme.colors.toggle.enabled,

				"&.toggle": {
					justifyContent: "end"
				},

				"& > span": {
					background: `${theme.colors.toggle.color}`
				}
			}
		},

		"& > p": {}
	});
});
