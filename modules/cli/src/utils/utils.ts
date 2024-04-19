import { program } from "@commander-js/extra-typings";
import { access, lstat } from "node:fs/promises";
import path from "path";
import { cliConfig, INDENT_SIZE, TEMPLATE_EXTENSION } from "../config.js";
import { TemplateReplaceOperation } from "../types.js";
import { voaReadDir, voaReadFile, voaWriteFile } from "./filesystemUtils.js";
import { voaLog } from "./loggingUtils.js";

export const prettyLog = (string: string) => {
	console.log(string);
};

export const stringifyBeautifully = (value: any) =>
	JSON.stringify(value, null, INDENT_SIZE);

export const getOptions = () => {
	return program.opts();
};

export const retrieveTemplateFiles = async (directoryPath: string) => {
	prettyLog(directoryPath);
	return await voaReadDir(directoryPath);
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

export const isFileOrDir = async (filePath: string) => {
	const templateLStat = await lstat(filePath);
	const isFile = templateLStat.isFile();
	const isDir = templateLStat.isDirectory();

	return { isFile, isDir };
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

const getContentReplacePattern = (searchValue: string) =>
	new RegExp(`\\$(?:\\{${searchValue}\}|${searchValue})`, "g");
const getPathNameReplacePattern = (searchValue: string) =>
	new RegExp(`_{2}${searchValue}_{2}`, "g");

export const makeContentReplaceOperation =
	(searchString: string, value: string): TemplateReplaceOperation =>
	(previousValue: string) =>
		previousValue.replaceAll(getContentReplacePattern(searchString), value);

export const makePathReplaceOperation =
	(searchString: string, value: string) => (previousValue: string) =>
		previousValue.replaceAll(
			getPathNameReplacePattern(searchString),
			value
		);
