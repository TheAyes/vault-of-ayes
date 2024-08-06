import { type TChalk, TYPES } from "@vault-of-ayes/shared";
import { inject, singleton } from "tsyringe";
import type { IFactory } from "../factory";
import type { ICliConfig } from "./config.interface.ts";

@singleton()
export class CliConfig implements ICliConfig {
	public readonly logLevels: ICliConfig["logLevels"];
	public readonly templateExtension: ICliConfig["templateExtension"] =
		".template";
	public readonly indentSize: ICliConfig["indentSize"] = 4;
	public readonly encoding: ICliConfig["encoding"] = "utf-8";
	public logLevel: ICliConfig["logLevel"] = "debug";
	public templateFileContentReplaceOperations: ICliConfig["templateFileContentReplaceOperations"];
	public templateDirNameReplaceOperations: ICliConfig["templateDirNameReplaceOperations"];

	constructor(
		@inject(TYPES.Chalk) private chalk: TChalk,
		@inject(TYPES.Factory) private factory: IFactory
	) {
		this.logLevels = [
			{
				id: "debug",
				caption: "DEBUG",
				color: this.chalk.bgRgb(40, 40, 40)
			},
			{ id: "log", caption: "LOG", color: this.chalk.bgGrey },
			{ id: "info", caption: "INFO", color: this.chalk.bgBlue },
			{ id: "warn", caption: "WARN", color: this.chalk.bgYellow },
			{ id: "error", caption: "ERROR", color: this.chalk.bgRed },
			{ id: "none", caption: "NONE", color: this.chalk.black }
		];

		this.templateFileContentReplaceOperations = [
			this.factory.makeContentReplaceOperation("name", process.argv[2]),
			this.factory.makeContentReplaceOperation(
				"date",
				new Date().toDateString()
			),
			this.factory.makeContentReplaceOperation(
				"time",
				new Date().toTimeString()
			)
		];
		this.templateDirNameReplaceOperations = [
			this.factory.makePathReplaceOperation("name", process.argv[2]),
			this.factory.makePathReplaceOperation(
				"date",
				new Date().toDateString()
			),
			this.factory.makePathReplaceOperation(
				"time",
				new Date().toTimeString()
			)
		];
	}
}
