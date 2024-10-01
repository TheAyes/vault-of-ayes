import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Checkbox, type ICheckbox } from "./Checkbox.root";

const meta = {
	title: "Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
	args: { onClick: fn() }
} satisfies Meta<ICheckbox>;
export default meta;

type TStory = StoryObj<typeof meta>;

export const Main: TStory = {
	args: {}
};
