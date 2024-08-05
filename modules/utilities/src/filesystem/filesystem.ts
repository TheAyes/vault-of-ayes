import type { INodeFsPromises } from "@vault-of-ayes/shared";
import { TYPES } from "@vault-of-ayes/shared";
import { inject, injectable } from "inversify";
import type { ICache } from "../cache";
import type { IConsole } from "../console";
import type { IPaths } from "../paths";
import type { IFilesystem } from "./filesystem.interface.ts";

@injectable()
export class Filesystem implements IFilesystem {
	constructor(
		@inject(TYPES.NodeFsPromises) private fs: INodeFsPromises,
		@inject(TYPES.Console) private consoleUtils: IConsole,
		@inject(TYPES.Paths) private pathUtils: IPaths,
		@inject(TYPES.Cache) private cache: ICache
	) {}

	public makeFile: IFilesystem["makeFile"] = async (
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

	public readFile: IFilesystem["readFile"] = async (file) => {
		return await this.cache.get(
			file,
			async () => await this.fs.readFile(file, { encoding: "utf-8" })
		);
	};

	makeDir: IFilesystem["makeDir"] = async (dir, { dry = false } = {}) =>
		this.consoleUtils.log(
			`Create dir received properties:\n  dir: ${dir}\n  dry: ${dry}`
		);

	readDir: IFilesystem["readDir"] = async (dir) => await this.fs.readdir(dir);

	findProjectRoot: IFilesystem["findProjectRoot"] = async (
		startDir = "."
	) => {
		const maxDepth: number = 5;
		let iterations = 0;

		const recursiveSearch = async (
			currentDir: string
		): Promise<string | undefined> => {
			try {
				const packageJsonPath = this.pathUtils.join(
					currentDir,
					"package.json"
				);
				await this.access(packageJsonPath);
				return currentDir;
			} catch {
				if (iterations > maxDepth) {
					return undefined;
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

	findConfigPath: IFilesystem["findConfigPath"] = async (startDir) => {
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

	lStat: IFilesystem["lStat"] = (pathUrl) => this.fs.lstat(pathUrl);

	isFileOrDir: IFilesystem["isFileOrDir"] = async (pathUrl) => {
		const templateLStat = await this.lStat(pathUrl);
		const isFile = templateLStat.isFile();
		const isDir = templateLStat.isDirectory();

		return { isFile, isDir };
	};

	exists: IFilesystem["exists"] = async (pathUrl) => {
		try {
			const normalizedPath = this.pathUtils.normalize(pathUrl.toString());
			await this.access(normalizedPath);
			return true;
		} catch {
			return false;
		}
	};

	access: IFilesystem["access"] = async (path, mode) =>
		this.fs.access(path, mode);
}
