import { CLIConfig } from "./types";
import {
	voaMakeContentReplaceOperation,
	voaMakePathReplaceOperation
} from "./utils/factories";

export const TEMPLATE_EXTENSION = ".template" as const;
export const UTF8_ENCODING: BufferEncoding = "utf-8" as const;
export const INDENT_SIZE: number = 4 as const;

export const cliConfig: CLIConfig = {
	logLevel: "debug",
	verbose: false,
	templateFileContentReplaceOperations: [
		voaMakeContentReplaceOperation("name", process.argv[2]),
		voaMakeContentReplaceOperation("date", new Date().toDateString()),
		voaMakeContentReplaceOperation("time", new Date().toTimeString())
	],
	templateDirNameReplaceOperations: [
		voaMakePathReplaceOperation("name", process.argv[2]),
		voaMakePathReplaceOperation("date", new Date().toDateString()),
		voaMakePathReplaceOperation("time", new Date().toTimeString())
	]
};
