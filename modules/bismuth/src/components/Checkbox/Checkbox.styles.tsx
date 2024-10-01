import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { TTheme } from "../../themes/themeDef.ts";
import type { ICheckbox } from "./Checkbox.root.ts";

export const StyledCheckbox = styled("label")<Partial<ICheckbox>>(() => {
	// @ts-ignore // Todo: Remove this if theme isn't used or is referenced.
	const theme = useTheme() as TTheme;

	return css({
		"& > button": {
			aspectRatio: "1/1",
			width: "2rem",
			border: `2px solid ${theme.colors.toggle.color}`,
			background: theme.colors.toggle.disabled,
			borderRadius: "6px",

			"& > svg": {
				overflow: "visible",
				scale: 1.6,
				stroke: theme.colors.toggle.color
			}
		}
	});
});
