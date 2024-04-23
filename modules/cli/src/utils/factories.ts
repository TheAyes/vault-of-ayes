import { TemplateReplaceOperation } from "../types.js";

const voaGetContentReplacePattern = (searchValue: string) =>
	new RegExp(`\\$(?:\\{${searchValue}\}|${searchValue})`, "g");
const voaGetPathNameReplacePattern = (searchValue: string) =>
	new RegExp(`_{2}${searchValue}_{2}`, "g");

export const voaMakeContentReplaceOperation =
	(searchString: string, value: string): TemplateReplaceOperation =>
	(previousValue: string) =>
		previousValue.replaceAll(
			voaGetContentReplacePattern(searchString),
			value
		);

export const voaMakePathReplaceOperation =
	(searchString: string, value: string) => (previousValue: string) =>
		previousValue.replaceAll(
			voaGetPathNameReplacePattern(searchString),
			value
		);
