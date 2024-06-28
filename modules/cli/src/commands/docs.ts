import { Command } from "@commander-js/extra-typings";

export const makeDocumentationCommand = () => {
	const projects = new Command("docs").option("--dry");

	projects.command("update").action(async () => {});

	return projects;
};
