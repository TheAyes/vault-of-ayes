import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ICheckbox extends DetailedHTMLProps<HTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
	isChecked: boolean;
}
