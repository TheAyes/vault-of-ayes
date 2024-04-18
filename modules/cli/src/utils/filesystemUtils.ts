import { PathLike } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { UTF8_ENCODING } from "../config.js";
import {
	VoaCreateDirOptions,
	VoaReadDirFunction,
	VoaWriteFileOptions
} from "../types.js";
import { voaLog } from "./loggingUtils.js";

export const voaWriteFile = async (
	file: PathLike,
	content: string,
	options: VoaWriteFileOptions = {
		dry: false
	}
) => {
	voaLog(
		`Write File received properties:\n  file: ${file}\n  content: ${content}\n  dry: ${options.dry}`
	);

	voaLog(`Trying to write file: ${file}`);
	if (!options.dry) await writeFile(file, content, "utf-8");
};

export const voaReadFile = async (file: PathLike): Promise<string> => {
	return await readFile(file, "utf-8");
};

export const voaCreateDir = async (
	dir: PathLike,
	options: VoaCreateDirOptions = {
		dry: false
	}
) => {
	voaLog(
		`Create dir received properties:\n  dir: ${dir}\n  dry: ${options.dry}`
	);
};

export const voaReadDir: VoaReadDirFunction = async (dir) => {
	return readdir(dir, {
		encoding: UTF8_ENCODING,
		recursive: true
	});
};
