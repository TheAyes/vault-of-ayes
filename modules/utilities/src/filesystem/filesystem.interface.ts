import type { Stats } from "node:fs";

export interface IFilesystem {
	makeFile(
		file: string,
		content: string,
		options?: { dry?: boolean }
	): Promise<void>;

	readFile(file: string): Promise<string>;

	makeDir(dir: string, options?: { dry?: boolean }): Promise<void>;

	readDir(dir: string): Promise<string[]>;

	findProjectRoot(startDir?: string): Promise<string | undefined>;

	findConfigPath(startDir: string): Promise<string | undefined>;

	lStat(pathUrl: string): Promise<Stats>;

	isFileOrDir(pathUrl: string): Promise<{
		isFile: boolean;
		isDir: boolean;
	}>;

	exists(pathUrl: string): Promise<boolean>;

	access(path: string, mode?: number): Promise<void>;
}
