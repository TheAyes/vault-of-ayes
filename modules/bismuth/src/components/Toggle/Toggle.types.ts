import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IToggle extends DetailedHTMLProps<HTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
	label?: string;
	toggled?: boolean;
}
