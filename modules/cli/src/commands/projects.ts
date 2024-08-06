import { Command } from "@commander-js/extra-typings";
import { TYPES } from "@vault-of-ayes/shared";
import {
	type IFilesystem,
	type IPaths,
	type ITemplateUtils,
	utilityContainer
} from "@vault-of-ayes/utilities";
import { vol } from "memfs";

export const makeProjectManagementCommands = () => {
	const projects = new Command("projects").option("--dry");

	const fs = utilityContainer.resolve<IFilesystem>(TYPES.FileSystem);
	const path = utilityContainer.resolve<IPaths>(TYPES.Paths);
	const templates = utilityContainer.resolve<ITemplateUtils>(TYPES.Templates);

	projects
		.command("add")
		.argument(
			"<project>",
			"The path to your project. Relative from the root directory."
		)
		.action(async (projectPath) => {
			const projectOptions = projects.opts();
			projectPath = path.normalize(projectPath);
			const rootPath = await fs.findProjectRoot();

			if (!rootPath) throw new Error();

			const templateFiles = await templates.retrieveTemplateFiles(
				path.join(rootPath, "templates/project")
			);

			vol.fromJSON({}, rootPath);

			console.log(templateFiles);

			//templateFiles.forEach((currentFile, index) => {
			//	//vol.mk;
			//});
		});

	projects
		.command("remove")
		.argument(
			"<project>",
			"The path to your project. Relative from the root directory."
		)
		.action(async (projectPath) => {
			const projectOptions = projects.opts();
			projectPath = path.join(projectPath);
		});

	return projects;
};
