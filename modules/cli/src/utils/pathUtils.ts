import path from "path";
import { VoaPathLike } from "../types";
import { voaLog } from "./consoleUtils";
import { voaAccess, voaLStat } from "./filesystemUtils";

export const voaNormalize = (pathUrl: string) => {
	voaLog(`Normalizing path: ${pathUrl}`, {
		logLevel: "debug",
		verboseOnly: true
	});

	let result = path.normalize(pathUrl);
	voaLog(`Normalized path to: ${result}`, {
		logLevel: "debug",
		verboseOnly: true
	});

	if (process.platform === "win32") {
		if (/^[\\\/]/.test(pathUrl)) result = `C:${result}`;
	}
	if (process.platform !== "win32") result = result.replace(/[A-Z]:/, "");

	return result;
};

export const voaJoin = (...paths: string[]) => {
	voaLog(`Joining paths: ${paths}`, { logLevel: "debug", verboseOnly: true });

	const result = path.join(...paths);
	voaLog(`Paths joined: ${result}`, { logLevel: "debug", verboseOnly: true });

	return voaNormalize(result);
};

export const voaIsFileOrDir = async (filePath: string) => {
	const templateLStat = await voaLStat(filePath);
	const isFile = templateLStat.isFile();
	const isDir = templateLStat.isDirectory();

	return { isFile, isDir };
};
export const voaExists = async (pathUrl: VoaPathLike) => {
	try {
		const normalizedPath = voaNormalize(pathUrl.toString());
		await voaAccess(normalizedPath);
		return true;
	} catch {
		return false;
	}
};

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

export const voaFindProjectRoot = async (
	startDir: string = "."
): Promise<string> => {
	const maxDepth: number = 5;
	let iterations = 0;

	const recursiveSearch = async (currentDir: string): Promise<string> => {
		try {
			const packageJsonPath = voaJoin(currentDir, "package.json");
			await voaAccess(packageJsonPath);
			return currentDir;
		} catch {
			if (iterations > maxDepth) {
				return "";
			} else {
				iterations++;

				const parentDir = voaJoin(currentDir, "..");
				return recursiveSearch(parentDir);
			}
		}
	};
	const result = await recursiveSearch(startDir);
	voaLog(`Found project root: ${result}`, { logLevel: "info" });
	return result;
};

export default voaPath;
