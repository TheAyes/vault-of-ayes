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
		return <Switch.Thumb {...props} ref={ref} className={styles.thumb} />;
	})
);

const ToggleControl = motion.create(
	forwardRef(({ children, ...props }: { children: ReactNode }, ref: LegacyRef<HTMLSpanElement>) => {
		return (
			<Switch.Control {...props} ref={ref} className={styles.control}>
				{children}
			</Switch.Control>
		);
	})
);

const onVariants = {
	pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.8 : 0.2 }),
	checked: { pathLength: 1 },
	unchecked: { pathLength: 0 }
};

const offVariants = {
	pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.2 : 0.8 }),
	checked: { pathLength: 0 },
	unchecked: { pathLength: 1 }
};

// todo: Implement this: https://www.framer.com/motion/examples/#path-morphing
export const Toggle: FC<IToggle> = ({ label, defaultState = false }) => {
	const [isChecked, setIsChecked] = useState(defaultState);
	const onPathLength = useMotionValue(0);
	const onOpacity = useTransform(onPathLength, [0.25, 0.75], [0, 1]);

	const offPathLength = useMotionValue(0);
	const offOpacity = useTransform(offPathLength, [0.25, 0.75], [0, 1]);

	return (
		<Switch.Root
			checked={isChecked}
			onCheckedChange={(event) => {
				setIsChecked(event.checked);
			}}
			className={styles.root}
		>
			<ToggleControl>
				<ToggleThumb layout transition={{ type: "spring", stiffness: 700, damping: 30 }}>
					<motion.svg
						strokeLinecap="round"
						strokeLinejoin="round"
						animate={isChecked ? "checked" : "unchecked"}
						initial={false}
						viewBox="0 0 100 100"
					>
						<motion.path
							className={styles.OnIcon}
							variants={onVariants}
							fill="transparent"
							strokeWidth="30"
							width="200px"
							height="200px"
							d="M10 60 L40 90 L90 10"
							style={{ pathLength: onPathLength, opacity: onOpacity }}
							custom={isChecked}
						/>

						<motion.path
							className={styles.OffIcon}
							variants={offVariants}
							strokeWidth="30"
							d="m-30-30 160 160m0-160L-30 130"
							style={{ pathLength: offPathLength, opacity: offOpacity }}
							custom={isChecked}
						/>
					</motion.svg>
				</ToggleThumb>
			</ToggleControl>
			{label ? <Switch.Label>{label}</Switch.Label> : null}
			<Switch.HiddenInput />
		</Switch.Root>
	);
};
