import type { FC } from "react";
import { type IToggle, StyledToggle } from "./Toggle.root";

export const Toggle: FC<IToggle> = ({ children, ...props }) => {
	return <StyledToggle {...props}>{children}</StyledToggle>;
};

export default Toggle;
