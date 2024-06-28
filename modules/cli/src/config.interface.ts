import type { ChalkInstance } from "chalk";

export interface ICliConfig {
	readonly logLevels: { id: string; caption: string; color: ChalkInstance }[];
	logLevel: "debug" | "log" | "info" | "warn" | "error" | "none";
	findVoaConfig: () => Promise<string | undefined>;
	templateExtension: string;
	indentSize: number;
	encoding: BufferEncoding;
	readonly templateFileContentReplaceOperations: readonly ((
		previousValue: string
	) => string)[];
	readonly templateDirNameReplaceOperations: readonly ((
		previousValue: string
	) => string)[];
}
