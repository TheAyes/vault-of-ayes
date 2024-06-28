import chalk from "chalk";
import { inject, injectable } from "inversify";
import { cliConfig, logLevels } from "../config.js";
import type { ILogger } from "../externals.interface.ts";
import type { LogLevel, VoaLogOptions } from "../types";
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

	constructor(@inject("Logger") private logger: ILogger, @inject("")) {}

	public log(message: any) {
		this.baseLog(message, { logLevel: "log" });
	}

	public info(message: any) {
		this.baseLog(message, { logLevel: "info" });
	}

	public warn(message: any) {
		this.baseLog(message, { logLevel: "warn" });
	}

	public error(message: any) {
		this.baseLog(message, { logLevel: "error" });
	}

	private baseLog(message: any, { logLevel = "log" }: VoaLogOptions = {}) {
		if (this.shouldLog({ logLevel }) || logLevel === "none") return;

		let logLevelObject = logLevels.find(
			(value) => value.id === logLevel
		) ?? {
			id: logLevel,
			caption: logLevel.toUpperCase() as LogLevel["caption"],
			color: chalk.white
		};

		if (typeof message === "object") {
			message = JSON.stringify(message, null, 2);
		}

		//message = `${logLevelPrefix} ${message}`;
		const coloredMessage = colorSyntax(`${message}`);

		this.logger[logLevel](`${logLevelObject.caption}:`, coloredMessage);
	}

	private shouldLog({
		logLevel = "log",
		verboseOnly = false
	}: VoaLogOptions = {}): boolean {
		// Exit early if global log level is set to "none"
		if (cliConfig.logLevel === "none") return false;

		// Introduce variable for index comparison to make the logic understandable
		const logLevelComparison =
			logLevels.findIndex((value) => value.id === logLevel) >=
			logLevels.findIndex((value) => value.id === cliConfig.logLevel);

		return logLevelComparison && !(verboseOnly && !cliConfig.verbose);
	}
}
