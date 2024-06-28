import type { Stats } from "node:fs";
import type { VoaCreateDirOptions, VoaWriteFileOptions } from "../types.ts";

export interface IFilesystemUtils {
	voaMakeFile(
		file: string,
		content: string,
		options?: VoaWriteFileOptions
	): Promise<void>;

	voaReadFile(file: string): Promise<string>;

	voaMakeDir(dir: string, options?: VoaCreateDirOptions): Promise<void>;

	voaReadDir(dir: string): Promise<string[]>;

	voaFindProjectRoot(startDir?: string): Promise<string>;

	voaFindConfigPath(startDir: string): Promise<string>;

	voaLStat(pathUrl: string): Promise<Stats>;

	voaIsFileOrDir(pathUrl: string): Promise<{
		isFile: boolean;
		isDir: boolean;
	}>;

	voaExists(pathUrl: string): Promise<boolean>;

	voaAccess(path: string, mode?: number): Promise<void>;
}
