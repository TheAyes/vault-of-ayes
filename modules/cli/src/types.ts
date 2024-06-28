import type { ObjectEncodingOptions, PathLike } from "node:fs";

export type TemplateReplaceOperation = (previousValue: string) => string;

export type CLIConfig = {
	logLevel: LogLevel; // FIX
	verbose: boolean;
	readonly templateExtension: string;
	readonly indentSize: number;
	readonly encoding: BufferEncoding;
	readonly templateFileContentReplaceOperations: readonly TemplateReplaceOperation[];
	readonly templateDirNameReplaceOperations: readonly TemplateReplaceOperation[];
};

// Log
export type VoaLogOptions = {
	logLevel?: LogLevel; // FIX
	verboseOnly?: boolean;
};
export type VoaLogFunction = (message: any, options?: VoaLogOptions) => void;

// Fs
export type VoaFilesystemOptions = { dry?: boolean };
export type VoaWriteFileOptions = VoaFilesystemOptions;
export type VoaCreateDirOptions = VoaFilesystemOptions;
export type VoaReadDirFunction = (dir: VoaPathLike) => Promise<string[]>;
export type FileStructure = Array<{
	name: string;
	files: string[];
	directories: FileStructure;
}>;
export type VoaPathLike = PathLike;
export type VoaObjectEncodingOptions = ObjectEncodingOptions;
