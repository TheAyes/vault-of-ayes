import type { Command } from "@commander-js/extra-typings";

export interface IProjectFactory {
	projectManagementCommands: () => Command;
}
