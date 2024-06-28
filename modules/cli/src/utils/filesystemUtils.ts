import { inject, injectable } from "inversify";
import type { INodeFsPromises } from "../externals.interface.ts";
import type { VoaCreateDirOptions, VoaWriteFileOptions } from "../types";
import type { IConsoleUtils } from "./consoleUtils.interface.ts";

import type { IFilesystemUtils } from "./filesystemUtils.interface.ts";
import type { IPathUtils } from "./pathUtils.interface.ts";

@injectable()
export class FilesystemUtils implements IFilesystemUtils {
	constructor(
		@inject("NodeFsPromises") private fs: INodeFsPromises,
		@inject("ConsoleUtils") private consoleUtils: IConsoleUtils,
		@inject("PathUtils") private pathUtils: IPathUtils
	) {}

	public voaMakeFile = async (
		file: string,
		content: string,
		{ dry = false }: VoaWriteFileOptions = {}
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

	public voaReadFile = async (file: string): Promise<string> => {
		return await this.fs.readFile(file, { encoding: "utf-8" });
	};

	voaMakeDir = async (
		dir: string,
		options: VoaCreateDirOptions = {
			dry: false
		}
	) => {
		this.consoleUtils.log(
			`Create dir received properties:\n  dir: ${dir}\n  dry: ${options.dry}`
		);
	};

	voaReadDir = async (dir: string) => {
		/*const files: string[] = [];
		const directories: FileStructure = [];
		const entries = await readdir(dir, {
			encoding: "utf8"
		});
		for (const entry of entries) {
			const fullPath = voaPath.join(dir, entry);
			const stats = await lstat(fullPath);
			if (stats.isDirectory()) {
				const directoryDetail = await this.voaReadDir(fullPath);
				directories.push({
					name: entry,
					files: directoryDetail.files,
					directories: directoryDetail.directories
				});
			} else if (stats.isFile()) {
				files.push(entry);
			}
		}
		return {
			name: voaPath.basename(dir.toString()),
			files: files,
			directories: directories
		};*/

		return this.fs.readdir(dir);
	};

	voaFindProjectRoot = async (startDir: string = "."): Promise<string> => {
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

	voaFindConfigPath = async (startDir: string) => {
		const root = await this.voaFindProjectRoot(startDir);
		const voaConfigPath = this.pathUtils.join(root, "config.ts");

		if (await this.voaExists(voaConfigPath)) return voaConfigPath;
		return "";
	};

	voaLStat = (pathUrl: string) => this.fs.lstat(pathUrl);

	voaIsFileOrDir = async (pathUrl: string) => {
		const templateLStat = await this.voaLStat(pathUrl);
		const isFile = templateLStat.isFile();
		const isDir = templateLStat.isDirectory();

		return { isFile, isDir };
	};

	voaExists = async (pathUrl: string) => {
		try {
			const normalizedPath = this.pathUtils.normalize(pathUrl.toString());
			await this.voaAccess(normalizedPath);
			return true;
		} catch {
			return false;
		}
	};

	voaAccess = async (path: string, mode?: number) =>
		this.fs.access(path, mode);
}
