import { PathLike } from "node:fs";
import { lstat } from "node:fs/promises";
import path from "path";
import { voaLog } from "./loggingUtils.js";

export const voaNormalize = (pathUrl: string) => {
	voaLog(`Normalizing path: ${pathUrl}`, { logLevel: "debug" });

	let result = path.normalize(pathUrl);
	voaLog(`Normalized path to: ${result}`, { logLevel: "debug" });

	if (process.platform === "win32") {
		if (/^[\\\/]/.test(pathUrl)) result = `C:${result}`;
	}
	if (process.platform !== "win32") result = result.replace(/[A-Z]:/, "");

	return result;
};

export const voaJoin = (...paths: string[]) => {
	voaLog(`Joining paths: ${paths}`, { logLevel: "debug" });

	const result = path.join(...paths);
	voaLog(`Paths joined: ${result}`, { logLevel: "debug" });

	return voaNormalize(result);
};

export const voaIsFileOrDir = async (filePath: string) => {
	const templateLStat = await lstat(filePath);
	const isFile = templateLStat.isFile();
	const isDir = templateLStat.isDirectory();

	return { isFile, isDir };
};

export const voaExists = (pathUrl: PathLike) => {};
