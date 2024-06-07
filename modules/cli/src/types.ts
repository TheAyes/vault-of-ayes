import { ObjectEncodingOptions, PathLike } from "node:fs";
import { logLevels } from "./utils/consoleUtils";

export type LogLevel = (typeof logLevels)[number];
export type TemplateReplaceOperation = (previousValue: string) => string;

export type CLIConfig = {
	logLevel: LogLevel["id"];
	verbose: boolean;
	templateFileContentReplaceOperations: TemplateReplaceOperation[];
	templateDirNameReplaceOperations: TemplateReplaceOperation[];
};

// Log
export type VoaLogOptions = {
	logLevel?: LogLevel["id"];
	verboseOnly?: boolean;
};
export type VoaLogFunction = (message: any, options?: VoaLogOptions) => void;

// Fs
export type VoaFilesystemOptions = { dry?: boolean };
export type VoaWriteFileOptions = VoaFilesystemOptions;
export type VoaCreateDirOptions = VoaFilesystemOptions;
export type VoaReadDirFunction = (dir: VoaPathLike) => Promise<string[]>;

export type VoaPathLike = PathLike;
export type VoaObjectEncodingOptions = ObjectEncodingOptions;
