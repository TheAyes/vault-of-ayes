import classNames from "classnames";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FC, useState } from "react";
import { type IToggle, StyledToggle } from "./Toggle.root";

const checkmarkVariants = {
	pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.8 : 0.2 }),
	checked: { pathLength: 1 },
	unchecked: { pathLength: 0 }
};

const offVariants = {
	pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.2 : 0.8 }),
	checked: { pathLength: 0 },
	unchecked: { pathLength: 1 }
};

export const Toggle: FC<IToggle> = ({ label, toggled = false, variant = "toggle", ...props }) => {
	const [isToggled, setToggled] = useState(toggled);
	const onPathLength = useMotionValue(0);
	const onOpacity = useTransform(onPathLength, [0.1, 0.2], [0, 1]);

	const offPathLength = useMotionValue(0);
	const offOpacity = useTransform(offPathLength, [0.3, 0.8], [0, 1]);

	return (
		<StyledToggle autoFocus={false} {...props}>
			{(() => {
				switch (variant) {
					case "toggle":
						return (
							<motion.button
								className={classNames({ toggled: isToggled, toggle: true })}
								onClick={() => setToggled((prev) => !prev)}
								initial={{ width: "3rem" }}
								animate={{
									width: "5rem",
									transition: { delay: 0.5, type: "spring", damping: 30, stiffness: 700 }
								}}
								exit={{ width: "30px" }}
								whileTap={{ scale: 0.95 }}
								aria-checked={isToggled}
							>
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
										animate={isToggled ? "checked" : "unchecked"}
										whileTap={"pressed"}
										initial={true}
										viewBox="0 0 100 100"
									>
										<motion.path
											className="onIcon"
											variants={checkmarkVariants}
											fill="transparent"
											strokeWidth="30"
											width="200px"
											height="200px"
											d="M10 60 L40 90 L90 10"
											style={{ pathLength: onPathLength, opacity: onOpacity }}
											custom={isToggled}
										/>
										{}
										<motion.path
											className="offIcon"
											variants={offVariants}
											fill="transparent"
											strokeWidth="30"
											width="200px"
											height="200px"
											d="m-30-30 160 160m0-160L-30 130"
											style={{ pathLength: offPathLength, opacity: offOpacity }}
											custom={isToggled}
										/>
									</motion.svg>
								</motion.span>
							</motion.button>
						);
					case "checkbox":
						return (
							<motion.button
								className={classNames({ toggled: isToggled, checkbox: true })}
								onClick={() => setToggled((prev) => !prev)}
								initial={{ scale: 0.4 }}
								animate={{
									scale: 1,
									width: "3rem",
									transition: { delay: 0.2, type: "spring", damping: 30, stiffness: 700 }
								}}
								exit={{ scale: 0.4 }}
								whileTap={{ scale: 0.95 }}
								aria-checked={isToggled}
							>
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
										animate={isToggled ? "checked" : "unchecked"}
										whileTap={"pressed"}
										initial={true}
										viewBox="0 0 100 100"
									>
										<motion.path
											className="onIcon"
											variants={checkmarkVariants}
											fill="transparent"
											strokeWidth="30"
											width="200px"
											height="200px"
											d="M10 60 L40 90 L90 10"
											style={{ pathLength: onPathLength, opacity: onOpacity }}
											custom={isToggled}
										/>
									</motion.svg>
								</motion.span>
							</motion.button>
						);

					default:
						return <></>;
				}
			})()}
			{(label != null || label == "") && <p>{label}</p>}
		</StyledToggle>
	);
};

export default Toggle;
