import { Switch } from "@ark-ui/react";
import { motion, useMotionValue, useTransform } from "framer-motion";
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

const checkVariants = {
	hover: { scale: 1.05, strokeWidth: 60 },
	pressed: { scale: 0.95, strokeWidth: 35 },
	checked: { stroke: "#009900", fill: "#009900", strokeWidth: 50 },
	unchecked: { stroke: "#cc0000", fill: "#cc0000", strokeWidth: 50 }
};

const paths = [
	"m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z",
	"M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
];

// todo: Implement this: https://www.framer.com/motion/examples/#path-morphing
export const Toggle: FC<IToggle> = ({ label, defaultState = false }) => {
	const [state, setState] = useState(defaultState);
	const pathLength = useMotionValue(0);
	const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

	return (
		<Switch.Root
			checked={state}
			onCheckedChange={(event) => {
				setState(event.checked);
			}}
		>
			<ToggleControl>
				<ToggleThumb layout transition={{ type: "spring", stiffness: 700, damping: 30 }}>
					<motion.svg
						viewBox="0 -960 960 960"
						fill="transparent"
						stroke="#7700ff"
						strokeLinecap="round"
						strokeLinejoin="round"
						animate={state ? "checked" : "unchecked"}
						initial={false}
						whileHover="hover"
						whileTap="pressed"
					>
						<motion.path variants={checkVariants} d={paths[Number(state)]} custom={state} />
					</motion.svg>
				</ToggleThumb>
			</ToggleControl>
			{label ? <Switch.Label>{label}</Switch.Label> : null}
			<Switch.HiddenInput />
		</Switch.Root>
	);
};
