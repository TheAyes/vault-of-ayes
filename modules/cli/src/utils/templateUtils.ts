import { voaReadDir } from "./filesystemUtils.js";
import { voaLog } from "./loggingUtils.js";

export const voaRetrieveTemplateFiles = async (directoryPath: string) => {
	voaLog(`Trying to retrieve templates from ${directoryPath}`, {
		logLevel: "debug"
	});
	return await voaReadDir(directoryPath);
};
