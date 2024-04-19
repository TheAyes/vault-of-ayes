import { PathLike } from "node:fs";
import { logLevels } from "./utils/loggingUtils.js";

export type LogLevel = (typeof logLevels)[number];
export type TemplateReplaceOperation = (previousValue: string) => string;

export type CLIConfig = {
	logLevel: LogLevel;
	verbose: boolean;
	templateFileContentReplaceOperations: TemplateReplaceOperation[];
	templateDirNameReplaceOperations: TemplateReplaceOperation[];
};

// Log
export type VoaLogOptions = {
	logLevel?: LogLevel;
	verboseOnly?: boolean;
};
export type VoaLogFunction = (message: string, options?: VoaLogOptions) => void;

// Fs
export type VoaFilesystemOptions = { dry?: boolean };
export type VoaWriteFileOptions = VoaFilesystemOptions;
export type VoaCreateDirOptions = VoaFilesystemOptions;
export type VoaReadDirFunction = (dir: PathLike) => Promise<string[]>;
