import chalk from "chalk";
import * as process from "node:process";
import { cliConfig } from "../config.js";
import { LogLevel, VoaLogFunction, VoaLogOptions } from "../types";
import { colorSyntax } from "./syntaxLoggingUtils";

export const logLevels = [
	{ id: "debug", caption: "DEBUG", color: chalk.bgRgb(40, 40, 40) },
	{ id: "log", caption: "LOG", color: chalk.bgGrey },
	{ id: "info", caption: "INFO", color: chalk.bgBlue },
	{ id: "warn", caption: "WARN", color: chalk.bgYellow },
	{ id: "error", caption: "ERROR", color: chalk.bgRed },
	{ id: "none", caption: "NONE", color: chalk.black }
] as const;

const promisify = (func: Function) =>
	new Promise((resolve, reject) => {
		try {
			resolve(func());
		} catch (err) {
			reject(err);
		}
	});

class voaConsole {
	public static async start(
		message: string,
		func: () => void | Promise<void>
	) {
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

		const result = await promisify(func);
		clearInterval(interval);
		return result;
	}

	public static log(message) {}

	public static info(message) {}

	public static warn(message) {}

	public static error(message) {}
}

console.log(null == undefined);

export const shouldLog = ({
	logLevel = "log",
	verboseOnly = false
}: VoaLogOptions = {}): boolean => {
	// Exit early if global log level is set to "none"
	if (cliConfig.logLevel === "none") return false;

	// Introduce variable for index comparison to make the logic understandable
	const logLevelComparison =
		logLevels.findIndex((value) => value.id === logLevel) >=
		logLevels.findIndex((value) => value.id === cliConfig.logLevel);

	return logLevelComparison && !(verboseOnly && !cliConfig.verbose);
};

export const voaLog: VoaLogFunction = (
	message,
	{ logLevel = "log", verboseOnly = false }: VoaLogOptions = {}
) => {
	if (!shouldLog({ logLevel, verboseOnly }) || logLevel === "none") return;

	let logLevelObject = logLevels.find((value) => value.id === logLevel) ?? {
		id: logLevel,
		caption: logLevel.toUpperCase() as LogLevel["caption"],
		color: chalk.white
	};

	if (typeof message === "object") {
		message = JSON.stringify(message, null, 2);
	}

	//message = `${logLevelPrefix} ${message}`;
	const coloredMessage = colorSyntax(`${message}`);

	console[logLevel](`${logLevelObject.caption}:`, coloredMessage);
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
voaConsole.start("Hello", async () => {
	await sleep(5000);
});
