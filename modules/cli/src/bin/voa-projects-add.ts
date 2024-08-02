/*
import { program } from "@commander-js/extra-typings";
import * as path from "path";
import { cliConfig } from "../config.js";
import { voaCreateDir } from "../utils/filesystemUtils.js";
import { voaLog } from "../utils/loggingUtils.js";
import { voaJoin } from "../utils/pathUtils.js";
import { findProjectRoot } from "../utils/templateUtils.js";
import {
	applyFileNameReplacementOperations,
	isFileOrDir,
	processFile,
	retrieveTemplateFiles,
	stringifyBeautifully
} from "../utils/utils.js";

const generateTemplateFiles = async (templatePath: string) => {
	const options = program.opts();
	voaLog(`Received Options: ${JSON.stringify(options, null, 4)}`);

	const rootPath = await findProjectRoot();
	const templatesPath = voaJoin(rootPath, "./templates", templatePath);

	const templateFiles = await retrieveTemplateFiles(templatesPath);
	voaLog(`Found templates: ${stringifyBeautifully(templateFiles)}`, {
		logLevel: "log",
		verboseOnly: true
	});

	const processedTemplateFiles = await applyFileNameReplacementOperations(
		templateFiles,
		cliConfig.templateDirNameReplaceOperations
	);
	voaLog(
		`Transformed template path to: ${stringifyBeautifully(processedTemplateFiles)}`,
		{
			logLevel: "log",
			verboseOnly: true
		}
	);

	await voaCreateDir(processedTemplateFiles[0]);

	voaLog(`Creating ${processedTemplateFiles.length} template files.`, {
		logLevel: "log",
		verboseOnly: true
	});

	for (let i = 1; i < processedTemplateFiles.length; i++) {
		const templateFilePath = path.join(templatesPath, templateFiles[i]);
		voaLog(`Using path: ${templateFilePath}`, {
			logLevel: "log",
			verboseOnly: true
		});

		const { isFile, isDir } = await isFileOrDir(templateFilePath);
		voaLog(
			`Determined if path is a file or directory: ${stringifyBeautifully({
				isFile,
				isDir
			})}`,
			{
				logLevel: "log",
				verboseOnly: true
			}
		);

		if (isFile) {
			await processFile(templateFilePath, processedTemplateFiles, i);
		} else if (isDir) {
			await voaCreateDir(processedTemplateFiles[i]);
		}
	}
};

program
	.option(
		"--dry",
		"performs a dry run to see just the console output without actually writing any files or directories."
	)
	.option("--verbose", "Uses more detailed logging.")
	.argument(
		"<project-path>",
		"The name of your new project. This is also names the folder."
	)
	.action(async () => generateTemplateFiles("project"));

await program.parseAsync();
*/
