import classNames from "classnames";
import { motion, MotionValue, useMotionValue, useTransform } from "framer-motion";
import { FC, ReactNode, useState } from "react";
import { type IToggle, StyledToggle } from "./Checkbox.root.ts";

const checkMarkVariants = {
	pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.8 : 0.2 }),
	checked: { pathLength: 1 },
	unchecked: { pathLength: 0 }
};

const crossMarkVariants = {
	pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.2 : 0.8 }),
	checked: { pathLength: 0 },
	unchecked: { pathLength: 1 }
};

export const ThumbWrapper: FC<{ isChecked: boolean; children: ReactNode }> = ({ isChecked, children }) => (
	<motion.span
		layout
		initial={{ scale: 0 }}
		animate={{ scale: 1, transition: { delay: 0.2 } }}
		exit={{ scale: 0 }}
		transition={{ type: "spring", damping: 30, stiffness: 700 }}
	>
		<motion.svg
			strokeLinecap="round"
			strokeLinejoin="round"
			animate={isChecked ? "checked" : "unchecked"}
			whileTap={"pressed"}
			initial={true}
			viewBox="0 0 100 100"
		>
			{children}
		</motion.svg>
	</motion.span>
);

export const CheckMark: FC<{
	opacity: MotionValue<number>;
	pathLength: MotionValue<number>;
	isChecked: boolean;
}> = ({ opacity, pathLength, isChecked }) => (
	<motion.path
		className="onIcon"
		variants={checkMarkVariants}
		fill="transparent"
		strokeWidth="30"
		width="200px"
		height="200px"
		d="M10 60 L40 90 L90 10"
		style={{ pathLength: pathLength, opacity: opacity }}
		custom={isChecked}
	/>
);

export const CrossMark: FC<{
	opacity: MotionValue<number>;
	pathLength: MotionValue<number>;
	isChecked: boolean;
}> = ({ opacity, pathLength, isChecked }) => (
	<motion.path
		className="offIcon"
		variants={crossMarkVariants}
		fill="transparent"
		strokeWidth="30"
		width="200px"
		height="200px"
		d="m-30-30 160 160m0-160L-30 130"
		style={{ pathLength: pathLength, opacity: opacity }}
		custom={isChecked}
	/>
);

export const Toggle: FC<IToggle> = ({
	label,
	labelSide = "left",
	defaultState = false,
	variant = "toggle",
	...props
}) => {
	const [isChecked, setChecked] = useState(defaultState);
	const checkMarkPathLength = useMotionValue(0);
	const checkMarkOpacity = useTransform(checkMarkPathLength, [0.1, 0.2], [0, 1]);

	const crossMarkPathLength = useMotionValue(0);
	const crossMarkOpacity = useTransform(crossMarkPathLength, [0.3, 0.8], [0, 1]);

	return (
		<StyledToggle autoFocus={false} {...props}>
			{(() => {
				switch (variant) {
					case "toggle":
						return (
							<motion.button
								className={classNames({ toggled: isChecked, toggle: true })}
								onClick={() => setChecked((prev) => !prev)}
								initial={{ width: "3rem" }}
								animate={{
									width: "5rem",
									transition: { delay: 0.5, type: "spring", damping: 30, stiffness: 700 }
								}}
								exit={{ width: "30px" }}
								whileTap={{ scale: 0.95 }}
								aria-checked={isChecked}
							>
								<ThumbWrapper isChecked={isChecked}>
									<CheckMark
										isChecked={isChecked}
										opacity={checkMarkOpacity}
										pathLength={checkMarkPathLength}
									/>
									<CrossMark
										opacity={crossMarkOpacity}
										pathLength={crossMarkPathLength}
										isChecked={isChecked}
									/>
								</ThumbWrapper>
							</motion.button>
						);
					case "checkbox":
						return (
							<motion.button
								className={classNames({ toggled: isChecked, checkbox: true })}
								onClick={() => setChecked((prev) => !prev)}
								initial={{ scale: 0.4 }}
								animate={{
									scale: 1,
									width: "3rem",
									transition: { delay: 0.2, type: "spring", damping: 30, stiffness: 700 }
								}}
								exit={{ scale: 0.4 }}
								whileTap={{ scale: 0.95 }}
								aria-checked={isChecked}
							>
								<ThumbWrapper isChecked={isChecked}>
									<CheckMark
										isChecked={isChecked}
										opacity={checkMarkOpacity}
										pathLength={checkMarkPathLength}
									/>
								</ThumbWrapper>
							</motion.button>
						);

					default:
						return <></>;
				}
			})()}
			{label != null && label !== "" && <p>{label}</p>}
		</StyledToggle>
	);
};

export default Toggle;
