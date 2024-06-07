import {
	access,
	lstat,
	mkdir,
	readdir,
	readFile,
	writeFile
} from "node:fs/promises";
import {
	VoaCreateDirOptions,
	VoaPathLike,
	VoaWriteFileOptions
} from "../types";
import { voaLog } from "./consoleUtils";
import path, { voaPath } from "./pathUtils";

export const voaWriteFile = async (
	file: VoaPathLike,
	content: string,
	{ dry = false }: VoaWriteFileOptions = {}
) => {
	voaLog(
		`Write File received properties:\n  file: ${file}\n  content: ${content}\n  dry: ${dry}`
	);

	voaLog(`Trying to write file: ${file}`);
	if (!dry) {
		const dirName = path.dirname(file.toString());
		await mkdir(dirName, { recursive: true });

		await writeFile(file, content, { encoding: "utf-8" });
	}
};

export const voaReadFile = async (file: VoaPathLike): Promise<string> => {
	return await readFile(file, { encoding: "utf-8" });
};

export const voaAccess = async (path: VoaPathLike, mode?: number) =>
	access(path, mode);

export const voaCreateDir = async (
	dir: VoaPathLike,
	options: VoaCreateDirOptions = {
		dry: false
	}
) => {
	voaLog(
		`Create dir received properties:\n  dir: ${dir}\n  dry: ${options.dry}`
	);
};

export const voaReadDir = async (dir: string) => {
	type FileStructure = Array<{
		name: string;
		files: string[];
		directories: FileStructure;
	}>;
	const files: string[] = [];
	const directories: FileStructure = [];
	const entries = await readdir(dir, {
		encoding: "utf8"
	});
	for (const entry of entries) {
		const fullPath = voaPath.join(dir, entry);
		const stats = await lstat(fullPath);
		if (stats.isDirectory()) {
			const directoryDetail = await voaReadDir(fullPath);
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
		name: path.basename(dir),
		files: files,
		directories: directories
	};
};

const result = await voaReadDir("../../");
voaLog(result);

export const voaLStat = (pathUrl: VoaPathLike) => lstat(pathUrl);
