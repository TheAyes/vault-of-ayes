import type { ILogger } from "@vault-of-ayes/shared";
import type { ICliConfig } from "../config";

export interface IConsole extends ILogger {
	/*
		start: (message: string, func: () => void | Promise<void>) => Promise<void>;
	*/

	shouldLog: (logLevel: ICliConfig["logLevels"][number]["id"]) => boolean;
}
