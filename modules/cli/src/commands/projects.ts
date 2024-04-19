import { Command } from "@commander-js/extra-typings";
import { voaNormalize } from "../utils/pathUtils.js";
import { voaFindProjectRoot } from "../utils/templateUtils.js";

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
