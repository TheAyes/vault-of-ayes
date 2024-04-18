import { Command } from "@commander-js/extra-typings";

const program = new Command();

program
	.name("amones")
	.description("Management CLI for monorepos. Made by Ayes.")
	.version("0.0.0");

program.command("projects", "manage your projects.").aliases(["project"]);

program.parse();
