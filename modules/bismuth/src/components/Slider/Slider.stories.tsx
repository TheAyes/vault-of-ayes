import { Slider, type ISlider } from "./Slider.root";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta = {
	title: "Slider",
	component: Slider,
	tags: ['autodocs'],
	args: { onClick: fn() }
} satisfies Meta<ISlider>;
export default meta;

type TStory = StoryObj<typeof meta>;

export const Main: TStory = {
	args: {
	}
};