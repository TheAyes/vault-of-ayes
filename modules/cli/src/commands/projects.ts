import { injectable } from "inversify";
import { vol } from "memfs";
import type { TCommand } from "../externals.interface.ts";
import { voaFindProjectRoot } from "../utils/filesystemUtils";
import { voaJoin, voaNormalize } from "../utils/pathUtils.js";
import { voaRetrieveTemplateFiles } from "../utils/templateUtils.js";
import type { IProjectFactory } from "./projects.interface.ts";

@injectable()
export class ProjectFactory implements IProjectFactory {
	constructor(private projects: TCommand) {
		// Add Command
		this.projects
			.command("add")
			.argument(
				"<project>",
				"The path to your project. Relative from the root directory."
			)
			.action(async (projectPath) => {
				const projectOptions = projects.opts();
				projectPath = voaNormalize(projectPath);
				const rootPath = await voaFindProjectRoot();

				const templateFiles = await voaRetrieveTemplateFiles(
					voaJoin(rootPath, "templates/project")
				);

				vol.fromJSON({}, rootPath);

				console.log(templateFiles);

				//templateFiles.forEach((currentFile, index) => {
				//	//vol.mk;
				//});
			});

		// Remove Command
		this.projects
			.command("remove")
			.argument(
				"<project>",
				"The path to your project. Relative from the root directory."
			)
			.action(async (projectPath) => {
				const projectOptions = projects.opts();
				projectPath = voaNormalize(projectPath);
			});
	}
}

/*export const makeProjectCommand = () => {
	const projects = new Command("projects").option("--dry");

	projects
		.command("add")
		.argument(
			"<project>",
			"The path to your project. Relative from the root directory."
		)
		.action(async (projectPath) => {
			const projectOptions = projects.opts();
			projectPath = voaNormalize(projectPath);
			const rootPath = await findProjectRoot();

			const templateFiles = await voaRetrieveTemplateFiles(
				voaJoin(rootPath, "templates/project")
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
			projectPath = voaNormalize(projectPath);
		});

	return projects;
};*/
