import { Command } from "@commander-js/extra-typings";
import * as process from "node:process";
import { makeProjectCommand } from "./commands/projects";

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

/*voaProgram.action(() => {
	voaLog("Hello Debug!", { logLevel: "debug" });
	voaLog("Hello Log!", { logLevel: "log" });
	voaLog("Hello Info!", { logLevel: "info" });
	voaLog("Hello Warn!", { logLevel: "warn" });
	voaLog("Hello Error!", { logLevel: "error" });
});*/

voaProgram.addCommand(makeProjectCommand());

voaProgram.parse();
