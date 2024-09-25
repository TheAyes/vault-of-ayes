import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { type IToggle, Toggle } from "./Toggle.root";

const meta = {
	title: "Toggle",
	component: Toggle,
	tags: ["autodocs"],
	args: { onClick: fn() }
} satisfies Meta<IToggle>;
export default meta;

type TStory = StoryObj<typeof meta>;

export const Main: TStory = {
	args: {}
};
