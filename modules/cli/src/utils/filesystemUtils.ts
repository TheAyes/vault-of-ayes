import { inject, injectable } from "inversify";
import type { INodeFsPromises } from "../externals.interface.ts";
import { TYPES } from "../types";
import type { IConsoleUtils } from "./consoleUtils.interface.ts";
import type { IFilesystemUtils } from "./filesystemUtils.interface.ts";
import type { IPathUtils } from "./pathUtils.interface.ts";

@injectable()
export class FilesystemUtils implements IFilesystemUtils {
	constructor(
		@inject(TYPES.NodeFsPromises) private fs: INodeFsPromises,
		@inject(TYPES.ConsoleUtils) private consoleUtils: IConsoleUtils,
		@inject(TYPES.PathUtils) private pathUtils: IPathUtils
	) {}

	public voaMakeFile: IFilesystemUtils["voaMakeFile"] = async (
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

	public voaReadFile: IFilesystemUtils["voaReadFile"] = async (file) =>
		await this.fs.readFile(file, { encoding: "utf-8" });

	voaMakeDir: IFilesystemUtils["voaMakeDir"] = async (
		dir,
		{ dry = false } = {}
	) =>
		this.consoleUtils.log(
			`Create dir received properties:\n  dir: ${dir}\n  dry: ${dry}`
		);

	voaReadDir: IFilesystemUtils["voaReadDir"] = async (dir) =>
		this.fs.readdir(dir);

	voaFindProjectRoot: IFilesystemUtils["voaFindProjectRoot"] = async (
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
				await this.voaAccess(packageJsonPath);
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

	voaFindConfigPath: IFilesystemUtils["voaFindConfigPath"] = async (
		startDir
	) => {
		const root = await this.voaFindProjectRoot(startDir);
		if (!root) {
			this.consoleUtils.error("Couldn't find project root.");
			return;
		}

		const voaConfigPath = this.pathUtils.join(root, "config.ts");

		if (await this.voaExists(voaConfigPath)) return voaConfigPath;
		this.consoleUtils.error("Config file seems to not exist.");
		return undefined;
	};

	voaLStat: IFilesystemUtils["voaLStat"] = (pathUrl) =>
		this.fs.lstat(pathUrl);

	voaIsFileOrDir: IFilesystemUtils["voaIsFileOrDir"] = async (pathUrl) => {
		const templateLStat = await this.voaLStat(pathUrl);
		const isFile = templateLStat.isFile();
		const isDir = templateLStat.isDirectory();

		return { isFile, isDir };
	};

	voaExists: IFilesystemUtils["voaExists"] = async (pathUrl) => {
		try {
			const normalizedPath = this.pathUtils.normalize(pathUrl.toString());
			await this.voaAccess(normalizedPath);
			return true;
		} catch {
			return false;
		}
	};

	voaAccess: IFilesystemUtils["voaAccess"] = async (path, mode) =>
		this.fs.access(path, mode);
}
