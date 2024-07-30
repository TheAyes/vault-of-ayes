import chalk from "chalk";
import { inject, injectable } from "inversify";
import type { ICliConfig } from "../config.interface.ts";
import type { ILogger } from "../externals.interface.ts";
import { TYPES } from "../types";
import type { IConsoleUtils } from "./consoleUtils.interface.ts";

import { colorSyntax } from "./syntaxLoggingUtils";

@injectable()
export class ConsoleUtils implements IConsoleUtils {
	/*public async start(
		message: string,
		func: () => void | Promise<void>
	): Promise<void> {
		const animation = ["-", "\\", "|", "/"];
		const animationRateMs = 250;

		let interval;
		const animate = async () => {
			let step = 0;
			interval = setInterval(() => {
				process.stdout.write("\r" + animation[step++]);
				step %= animation.length;
			}, animationRateMs);
		};
		animate().then();

		await promisify<void>(func);
		clearInterval(interval);
		return;
	}*/

	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.CliConfig) private config: ICliConfig
	) {}

	public log(message: any) {
		this.baseLog(message, "log");
	}

	public info(message: any) {
		this.baseLog(message, "info");
	}

	public warn(message: any) {
		this.baseLog(message, "warn");
	}

	public error(message: any) {
		this.baseLog(message, "error");
	}

	private baseLog(
		message: any,
		logLevel: ICliConfig["logLevels"][number]["id"] = "log"
	) {
		if (this.shouldLog(logLevel) || logLevel === "none") return;

		let logLevelObject = this.config.logLevels.find(
			(value) => value.id === logLevel
		) ?? {
			id: logLevel,
			caption:
				logLevel.toUpperCase() as ICliConfig["logLevels"][number]["caption"],
			color: chalk.white
		};

		if (typeof message === "object") {
			message = JSON.stringify(message, null, 2);
		}

		//message = `${logLevelPrefix} ${message}`;
		const coloredMessage = colorSyntax(`${message}`);

		this.logger[logLevel as keyof ILogger](
			`${logLevelObject.caption}:`,
			coloredMessage
		);
	}

	private shouldLog(
		logLevel: ICliConfig["logLevels"][number]["id"] = "log"
	): boolean {
		// Exit early if global log level is set to "none"
		if (this.config.logLevel === "none") return false;

		// Introduce variable for index comparison to make the logic understandable
		return (
			this.config.logLevels.findIndex((value) => value.id === logLevel) >=
			this.config.logLevels.findIndex(
				(value) => value.id === this.config.logLevel
			)
		);
	}
}
