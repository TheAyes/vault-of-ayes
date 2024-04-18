import { CLIConfig } from "./types.js";
import {
	makeContentReplaceOperation,
	makePathReplaceOperation
} from "./utils/utils.js";

export const TEMPLATE_EXTENSION = ".template" as const;
export const UTF8_ENCODING: BufferEncoding = "utf-8" as const;
export const INDENT_SIZE: number = 4 as const;

export const cliConfig: CLIConfig = {
	logLevel: "debug" as const,
	verbose: true as const,
	templateFileContentReplaceOperations: [
		makeContentReplaceOperation("name", process.argv[2]),
		makeContentReplaceOperation("date", new Date().toDateString()),
		makeContentReplaceOperation("time", new Date().toTimeString())
	],
	templateDirNameReplaceOperations: [
		makePathReplaceOperation("name", process.argv[2]),
		makePathReplaceOperation("date", new Date().toDateString()),
		makePathReplaceOperation("time", new Date().toTimeString())
	]
};
