import { type Chalk, TYPES } from "@vault-of-ayes/shared";
import { inject, injectable } from "inversify";
import type { IFactory } from "../factory";
import type { IFilesystemUtils } from "../filesystem";
import type { IPaths } from "../paths";
import type { ICliConfig } from "./config.interface.ts";

@injectable()
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
		@inject("FileSystemUtils") private fs: IFilesystemUtils,
		@inject("PathUtils") private pathUtils: IPaths,
		@inject("Chalk") private chalk: Chalk,
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
			factory.makeContentReplaceOperation("name", process.argv[2]),
			factory.makeContentReplaceOperation(
				"date",
				new Date().toDateString()
			),
			factory.makeContentReplaceOperation(
				"time",
				new Date().toTimeString()
			)
		];
		this.templateDirNameReplaceOperations = [
			factory.makePathReplaceOperation("name", process.argv[2]),
			factory.makePathReplaceOperation("date", new Date().toDateString()),
			factory.makePathReplaceOperation("time", new Date().toTimeString())
		];
	}

	public findVoaConfig = async () => {
		const root = await this.fs.voaFindProjectRoot();
		if (root) {
			const voaConfigPath = this.pathUtils.join(root, "config.ts");

			if (await this.fs.voaExists(voaConfigPath)) return voaConfigPath;
		}
		return undefined;
	};

	/*public getVoaProjectConfig = async () => {
		const voaConfigPath = await this.findVoaConfig();
		if (voaConfigPath) {
			return await this.fs.voaReadFile(voaConfigPath);
		}

		return {};
	};*/
}
