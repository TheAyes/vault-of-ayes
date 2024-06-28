import {Command} from "@commander-js/extra-typings";
import {injectable} from "inversify";
import {vol} from "memfs";
import {voaFindProjectRoot} from "../utils/filesystemUtils";
import {voaJoin, voaNormalize} from "../utils/pathUtils.js";
import {voaRetrieveTemplateFiles} from "../utils/templateUtils.js";

export class ProjectFactory {
}

@injectable()
export const makeProjectCommand = () => {
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
};
