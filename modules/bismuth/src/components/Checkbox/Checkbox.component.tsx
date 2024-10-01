import { motion, useMotionValue, useTransform } from "framer-motion";
import { FC, useState } from "react";
import { type ICheckbox, StyledCheckbox } from "./Checkbox.root";

const checkmarkVariants = {
	pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.8 : 0.2 }),
	checked: { pathLength: 1 },
	unchecked: { pathLength: 0 }
};

export const Checkbox: FC<ICheckbox> = ({ children, isChecked = false, ...props }) => {
	const [isToggled, setToggled] = useState(isChecked);
	const onPathLength = useMotionValue(0);
	const onOpacity = useTransform(onPathLength, [0.1, 0.2], [0, 1]);

	return (
		<StyledCheckbox {...props}>
			<motion.button
				onClick={() => setToggled((prev) => !prev)}
				whileTap={{ scale: 0.8 }}
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
						variants={checkmarkVariants}
						fill="transparent"
						strokeWidth="20"
						width="200px"
						height="200px"
						d="M10 60 L40 90 L90 10"
						style={{ pathLength: onPathLength, opacity: onOpacity }}
						custom={isToggled}
					/>
				</motion.svg>
			</motion.button>
		</StyledCheckbox>
	);
};

export default Checkbox;
