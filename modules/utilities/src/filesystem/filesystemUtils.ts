import type { INodeFsPromises } from "@vault-of-ayes/shared";
import { TYPES } from "@vault-of-ayes/shared";
import { inject, injectable } from "inversify";
import type { ICache } from "../cache/cache.interface.ts";
import type { IConsoleUtils } from "../console";
import type { IPaths } from "../paths";
import type { IFilesystemUtils } from "./filesystemUtils.interface.ts";

@injectable()
export class FilesystemUtils implements IFilesystemUtils {
	constructor(
		@inject(TYPES.NodeFsPromises) private fs: INodeFsPromises,
		@inject(TYPES.ConsoleUtils) private consoleUtils: IConsoleUtils,
		@inject(TYPES.PathUtils) private pathUtils: IPaths,
		@inject(TYPES.Cache) private cache: ICache
	) {}

	public makeFile: IFilesystemUtils["makeFile"] = async (
		file,
		content,
		{ dry = false } = {}
	) => {
		this.consoleUtils.log(
			`Write File received properties:\n  file: ${file}\n  content: ${content}\n  dry: ${dry}`
		);

		this.consoleUtils.log(`Trying to write file: ${file}`);
		if (!dry) {
			const dirName = this.pathUtils.dirname(file.toString());

			await this.fs.mkdir(dirName, { recursive: true });
			await this.fs.writeFile(file, content, { encoding: "utf-8" });
		}
	};

	public readFile: IFilesystemUtils["readFile"] = async (file) => {
		await this.cache.registerKey(file, () =>
			this.fs.readFile(file, { encoding: "utf-8" })
		);

		return await this.cache.get(file);
	};

	makeDir: IFilesystemUtils["makeDir"] = async (dir, { dry = false } = {}) =>
		this.consoleUtils.log(
			`Create dir received properties:\n  dir: ${dir}\n  dry: ${dry}`
		);

	readDir: IFilesystemUtils["readDir"] = async (dir) =>
		await this.fs.readdir(dir);

	findProjectRoot: IFilesystemUtils["findProjectRoot"] = async (
		startDir = "."
	) => {
		const maxDepth: number = 5;
		let iterations = 0;

		const recursiveSearch = async (currentDir: string): Promise<string> => {
			try {
				const packageJsonPath = this.pathUtils.join(
					currentDir,
					"package.json"
				);
				await this.access(packageJsonPath);
				return currentDir;
			} catch {
				if (iterations > maxDepth) {
					return "";
				} else {
					iterations++;

					const parentDir = this.pathUtils.join(currentDir, "..");
					return recursiveSearch(parentDir);
				}
			}
		};
		const result = await recursiveSearch(startDir);
		this.consoleUtils.info(`Found project root: ${result}`);
		return result;
	};

	findConfigPath: IFilesystemUtils["findConfigPath"] = async (startDir) => {
		const root = await this.findProjectRoot(startDir);
		if (!root) {
			this.consoleUtils.error("Couldn't find project root.");
			return;
		}

		const voaConfigPath = this.pathUtils.join(root, "config.ts");

		if (await this.exists(voaConfigPath)) return voaConfigPath;
		this.consoleUtils.error("Config file seems to not exist.");
		return undefined;
	};

	lStat: IFilesystemUtils["lStat"] = (pathUrl) => this.fs.lstat(pathUrl);

	isFileOrDir: IFilesystemUtils["isFileOrDir"] = async (pathUrl) => {
		const templateLStat = await this.lStat(pathUrl);
		const isFile = templateLStat.isFile();
		const isDir = templateLStat.isDirectory();

		return { isFile, isDir };
	};

	exists: IFilesystemUtils["exists"] = async (pathUrl) => {
		try {
			const normalizedPath = this.pathUtils.normalize(pathUrl.toString());
			await this.access(normalizedPath);
			return true;
		} catch {
			return false;
		}
	};

	access: IFilesystemUtils["access"] = async (path, mode) =>
		this.fs.access(path, mode);
}
