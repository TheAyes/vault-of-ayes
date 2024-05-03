import path from "path";
import { VoaPathLike } from "../types.js";
import { voaLStat } from "./filesystemUtils.js";
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
	const templateLStat = await voaLStat(filePath);
	const isFile = templateLStat.isFile();
	const isDir = templateLStat.isDirectory();

	return { isFile, isDir };
};

// TODO: Implement this
export const voaExists = (pathUrl: VoaPathLike) => {};

export const voaDirname = (pathUrl: string) => path.dirname(pathUrl);

export const voaResolve = (...paths: string[]) => path.resolve(...paths);
export const voaPath = {
	...path,
	normalize: voaNormalize,
	join: voaJoin,
	isFileOrDir: voaIsFileOrDir,
	exists: voaExists,
	resolve: voaResolve,
	dirname: voaDirname
};

export default voaPath;
