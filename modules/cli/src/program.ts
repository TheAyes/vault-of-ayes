#!/usr/bin/env node

// TODO: Can we apply dependency injection here?

import { Command } from "@commander-js/extra-typings";
import { makeProjectManagementCommands } from "./commands/projects.ts";

export const voaProgram = new Command();

const errorColor = (str: string) => `\x1b[31m${str}\x1b[0m`;
const formatOutString = (str: string) => `${str}`;

voaProgram.configureOutput({
	writeOut: (str: string) => process.stdout.write(formatOutString(str)),
	writeErr: (str: string) => process.stderr.write(formatOutString(str)),
	outputError: (str: string, write: (str: string) => void) =>
		write(errorColor(str))
});

voaProgram.option("--verbose");

voaProgram.addCommand(makeProjectManagementCommands());
