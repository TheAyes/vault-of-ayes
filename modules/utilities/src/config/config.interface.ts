import type { ChalkInstance } from "chalk";
import type { IFactory } from "../factory";

export interface ICliConfig {
	readonly logLevels: {
		id: ICliConfig["currentLogLevel"];
		caption: string;
		color: ChalkInstance | null;
	}[];
	currentLogLevel: "debug" | "log" | "info" | "warn" | "error" | "none";
	templateExtension: string;
	indentSize: number;
	encoding: BufferEncoding;

	readonly templateFileContentReplaceOperations: readonly ReturnType<
		IFactory["makeContentReplaceOperation"]
	>[];
	readonly templateDirNameReplaceOperations: readonly ReturnType<
		IFactory["makePathReplaceOperation"]
	>[];
}
