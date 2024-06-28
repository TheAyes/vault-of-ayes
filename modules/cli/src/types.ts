import type { ObjectEncodingOptions } from "node:fs";

export type TemplateReplaceOperation = (previousValue: string) => string;

// Fs
export type VoaFilesystemOptions = { dry?: boolean };
export type VoaWriteFileOptions = VoaFilesystemOptions;
export type VoaCreateDirOptions = VoaFilesystemOptions;
export type VoaObjectEncodingOptions = ObjectEncodingOptions;

export const TYPES = {
	FileSystemUtils: Symbol.for("FileSystemUtils"),
	NodeFsPromises: Symbol.for("NodeFsPromises"),
	ConsoleUtils: Symbol.for("ConsoleUtils"),
	PathUtils: Symbol.for("PathUtils"),
	Logger: Symbol.for("Logger"),
	Chalk: Symbol.for("Chalk")
};
