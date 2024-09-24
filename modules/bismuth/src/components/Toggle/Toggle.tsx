import { Switch } from "@ark-ui/react";
import { motion } from "framer-motion";
import { FC, forwardRef, LegacyRef, ReactNode, useState } from "react";
import styles from "./Toggle.module.scss";

export interface IToggle {
	label?: string;
	defaultState?: boolean;
}

const ToggleThumb = motion.create(
	forwardRef((props, ref: LegacyRef<HTMLSpanElement>) => {
		return <Switch.Thumb {...props} ref={ref} className={styles.ToggleThumb} />;
	})
);

const ToggleControl = motion.create(
	forwardRef(({ children, ...props }: { children: ReactNode }, ref: LegacyRef<HTMLSpanElement>) => {
		return (
			<Switch.Control {...props} ref={ref} className={styles.Toggle}>
				{children}
			</Switch.Control>
		);
	})
);

export const Toggle: FC<IToggle> = ({ label, defaultState = false }) => {
	const [state, setState] = useState(defaultState);

	return (
		<Switch.Root
			checked={state}
			onCheckedChange={(event) => {
				setState(event.checked);
			}}
		>
			<ToggleControl>
				<ToggleThumb layout transition={{ type: "spring", stiffness: 700, damping: 30 }} />
			</ToggleControl>
			{label ? <Switch.Label>{label}</Switch.Label> : null}
			<Switch.HiddenInput />
		</Switch.Root>
	);
};
