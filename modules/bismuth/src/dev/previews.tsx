import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { ThumbWrapper, Toggle } from "../components/Checkbox/Checkbox.component.tsx";
import Slider from "../components/Slider/Slider.component.tsx";
import { PaletteTree } from "./palette";

const ComponentPreviews = () => {
	return (
		<Previews palette={<PaletteTree />}>
			<ComponentPreview path="/Slider">
				<Slider />
			</ComponentPreview>
			<ComponentPreview path="/Toggle">
				<Toggle />
			</ComponentPreview>
		</Previews>
	);
};

export default ComponentPreviews;
