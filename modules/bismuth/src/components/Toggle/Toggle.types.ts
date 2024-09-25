import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IToggle extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children?: ReactNode;
}