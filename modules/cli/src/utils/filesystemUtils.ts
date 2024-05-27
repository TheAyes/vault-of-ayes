import {
	access,
	lstat,
	mkdir,
	readdir,
	readFile,
	writeFile
} from "node:fs/promises";
import { UTF8_ENCODING } from "../config.js";
import {
	VoaCreateDirOptions,
	VoaPathLike,
	VoaReadDirFunction,
	VoaWriteFileOptions
} from "../types.js";
import { voaLog } from "./loggingUtils.js";
import path from "./pathUtils.js";

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

export const voaReadDir: VoaReadDirFunction = async (dir) => {
	return await readdir(dir, {
		encoding: UTF8_ENCODING,
		recursive: true
	});
};

export const voaLStat = (pathUrl: VoaPathLike) => lstat(pathUrl);
