import { voaAccess, voaReadDir } from "./filesystemUtils.js";
import { voaLog } from "./loggingUtils.js";
import { voaJoin } from "./pathUtils.js";

export const voaRetrieveTemplateFiles = async (directoryPath: string) => {
	voaLog(`Trying to retrieve templates from ${directoryPath}`, {
		logLevel: "debug"
	});
	return await voaReadDir(directoryPath);
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
