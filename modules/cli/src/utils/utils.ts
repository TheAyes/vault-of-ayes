/*
import path from "path";
import { cliConfig, TEMPLATE_EXTENSION } from "../config.js";
import { TemplateReplaceOperation } from "../types.js";
import { voaReadFile, voaWriteFile } from "./filesystemUtils.js";
import { voaLog } from "./loggingUtils.js";

export const prettyLog = (string: string) => {
	console.log(string);
};

export const applyFileNameReplacementOperations = async (
	fileNames: string[],
	operations: TemplateReplaceOperation[]
) => {
	return fileNames.map((filePath: string) => {
		return path.normalize(
			operations.reduce(
				(previousValue, operation: TemplateReplaceOperation): string =>
					operation(previousValue),
				filePath
			)
		);
	});
};
export const applyContentReplacementOperations = async (
	content: string,
	operations: TemplateReplaceOperation[]
) => {
	for (const operation of operations) {
		voaLog(
			`Applying content replacement operations:\n${operation.toString()}`,
			{ verboseOnly: true }
		);
		content = operation(content);
		voaLog(`Result of replacement operations:\n${content}`, {
			verboseOnly: true
		});
	}
	return content;
};

export const removeTemplateExtension = async (file: string) =>
	file.replaceAll(TEMPLATE_EXTENSION, "");

export const processFile = async (
	templateFilePath: string,
	processedTemplateFiles: string[],
	i: number
) => {
	let fileContent = await voaReadFile(templateFilePath);
	voaLog(`Read file: ${templateFilePath}}`, { verboseOnly: true });
	voaLog(`With contents:\n${fileContent}`, { verboseOnly: true });

	const processedFileContent = await applyContentReplacementOperations(
		fileContent,
		cliConfig.templateFileContentReplaceOperations
	);
	voaLog(`Processed file content: ${processedFileContent}`, {
		verboseOnly: true
	});

	const targetFilePath = await removeTemplateExtension(
		processedTemplateFiles[i]
	);
	voaLog(`Targeting path: ${targetFilePath}`, { verboseOnly: true });

	await voaWriteFile(targetFilePath, processedFileContent);
};
*/
