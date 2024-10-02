import type { Meta, StoryObj } from "@storybook/react";
import { type IToggle, Toggle } from "./Checkbox.root.ts";

const meta = {
	title: "Toggle",
	component: Toggle,
	tags: ["autodocs"]
} satisfies Meta<IToggle>;
export default meta;

type TStory = StoryObj<typeof meta>;

export const Switch: TStory = {
	args: {
		variant: "toggle",
		labelSide: "left"
	}
};

export const Checkbox: TStory = {
	args: {
		variant: "checkbox",
		labelSide: "left"
	}
};
