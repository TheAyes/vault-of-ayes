import { type ILogger, type TChalk, TYPES } from "@vault-of-ayes/shared";
import { inject, injectable } from "inversify";
import { type ICliConfig } from "../config";
import type { ISyntaxUtils } from "../syntaxHighlighting";
import type { IConsole } from "./consoleUtils.interface.ts";

@injectable()
export class ConsoleUtils implements IConsole {
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
		@inject(TYPES.Config) private config: ICliConfig,
		@inject(TYPES.Chalk) private chalk: TChalk,
		@inject(TYPES.SyntaxHighlighting) private syntaxUtils: ISyntaxUtils
	) {}

	public debug = (message: any) => this.baseLog(message, "debug");
	public log = (message: any) => this.baseLog(message, "log");
	public info = (message: any) => this.baseLog(message, "info");
	public warn = (message: any) => this.baseLog(message, "warn");
	public error = (message: any) => this.baseLog(message, "error");

	public shouldLog: IConsole["shouldLog"] = (logLevel = "log") => {
		// Exit early if global log level is set to "none"
		if (this.config.currentLogLevel === "none") return false;

		// Introduce variable for index comparison to make the logic understandable
		return (
			this.config.logLevels.findIndex((value) => value.id === logLevel) >=
			this.config.logLevels.findIndex(
				(value) => value.id === this.config.currentLogLevel
			)
		);
	};

	private baseLog = (
		message: any,
		logLevel: ICliConfig["currentLogLevel"] = "log"
	) => {
		if (this.shouldLog(logLevel) || logLevel === "none") return;

		let logLevelObject = this.config.logLevels.find(
			(value) => value.id === logLevel
		) ??
			this.config.logLevels[0] ?? {
				id: logLevel,
				caption: logLevel as ICliConfig["logLevels"][number]["caption"],
				color: this.chalk.white
			};

		if (typeof message === "object")
			message = JSON.stringify(message, null, 2);

		const coloredMessage = this.syntaxUtils.colorSyntax(`${message}`);

		this.logger[logLevel as keyof ILogger](
			`${logLevelObject.caption}:`,
			coloredMessage
		);
	};
}
