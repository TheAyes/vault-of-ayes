import { Slider as ArkSlider } from "@ark-ui/react";
import { FC } from "react";
import { type ISlider, StyledSlider } from "./Slider.root";

export const Slider: FC<ISlider> = ({ labelPosition = "left", ...props }) => {
	return (
		<StyledSlider {...props}>
			<ArkSlider.ValueText />
			<ArkSlider.Control>
				<ArkSlider.Track>
					<ArkSlider.Range />
				</ArkSlider.Track>
				<ArkSlider.Thumb index={0}>
					<ArkSlider.HiddenInput />
				</ArkSlider.Thumb>
			</ArkSlider.Control>
			<ArkSlider.Label>Label</ArkSlider.Label>
		</StyledSlider>
	);
};

export default Slider;
