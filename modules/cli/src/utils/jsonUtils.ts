import { INDENT_SIZE } from "../config";

export const voaStringify = (value: any) =>
	JSON.stringify(value, null, INDENT_SIZE);

export const voaParseJson = (text: string) => JSON.parse(text);
