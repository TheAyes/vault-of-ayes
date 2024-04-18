import { Command } from "@commander-js/extra-typings";

export const makeProjectCommand = () => {
	const projects = new Command("projects").option("--dry");

	type GlobalOptionType = ReturnType<typeof projects.opts>;

	projects
		.command("add")
		.argument("<project>")
		.action((projectPath, localOptions) => {
			type IntersectedOptions = GlobalOptionType & typeof localOptions;
			const options = localOptions as IntersectedOptions;

			options.dry;
		});

	projects.command("remove").action(() => {});

	return projects;
};
