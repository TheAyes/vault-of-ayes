import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import type { IToggle } from "./Toggle.root.ts";

export const StyledToggle = styled("div")<Partial<IToggle>>(() => {
	// @ts-ignore // Todo: Remove this if theme isn't used or is referenced.
	const theme = useTheme();

	return css({});
});
