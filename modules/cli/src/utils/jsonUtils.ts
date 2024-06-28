import { cliConfig } from "../config";

export const voaStringify = (value: any) =>
	JSON.stringify(value, null, cliConfig.indentSize);

export const voaParseJson = (text: string) => JSON.parse(text);
