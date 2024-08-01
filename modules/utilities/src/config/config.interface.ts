import type { ChalkInstance } from "chalk";
import type { IFactory } from "../factory";

export interface ICliConfig {
	readonly logLevels: { id: string; caption: string; color: ChalkInstance }[];
	logLevel: "debug" | "log" | "info" | "warn" | "error" | "none";
	findVoaConfig: () => Promise<string | undefined>;
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
