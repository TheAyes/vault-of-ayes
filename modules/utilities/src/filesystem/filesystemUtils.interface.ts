import type { Stats } from "node:fs";

export interface IFilesystemUtils {
	voaMakeFile(
		file: string,
		content: string,
		options?: { dry?: boolean }
	): Promise<void>;

	voaReadFile(file: string): Promise<string>;

	voaMakeDir(dir: string, options?: { dry?: boolean }): Promise<void>;

	voaReadDir(dir: string): Promise<string[]>;

	voaFindProjectRoot(startDir?: string): Promise<string | undefined>;

	voaFindConfigPath(startDir: string): Promise<string | undefined>;

	voaLStat(pathUrl: string): Promise<Stats>;

	voaIsFileOrDir(pathUrl: string): Promise<{
		isFile: boolean;
		isDir: boolean;
	}>;

	voaExists(pathUrl: string): Promise<boolean>;

	voaAccess(path: string, mode?: number): Promise<void>;
}
