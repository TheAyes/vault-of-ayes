export const voaRetrieveTemplateFiles = async (directoryPath: string) => {
	voaLog(`Trying to retrieve templates from ${directoryPath}`, {
		logLevel: "debug"
	});
	return await voaReadDir(directoryPath);
};

voaLog(await voaRetrieveTemplateFiles("../../"));
