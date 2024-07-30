import { inject, injectable } from "inversify";
import type { ICliConfig } from "./config.interface.ts";
import type { Chalk } from "./externals.interface.ts";
import {
	voaMakeContentReplaceOperation,
	voaMakePathReplaceOperation
} from "./utils/factories";
import type { IFilesystemUtils } from "./utils/filesystemUtils.interface.ts";
import type { IPathUtils } from "./utils/pathUtils.interface.ts";

@injectable()
export class CliConfig implements ICliConfig {
	public readonly logLevels: ICliConfig["logLevels"];
	public readonly templateExtension: ICliConfig["templateExtension"] =
		".template";
	public readonly indentSize: ICliConfig["indentSize"] = 4;
	public readonly encoding: ICliConfig["encoding"] = "utf-8";
	public logLevel: ICliConfig["logLevel"] = "debug";
	public templateFileContentReplaceOperations = [
		voaMakeContentReplaceOperation("name", process.argv[2]),
		voaMakeContentReplaceOperation("date", new Date().toDateString()),
		voaMakeContentReplaceOperation("time", new Date().toTimeString())
	];
	public templateDirNameReplaceOperations = [
		voaMakePathReplaceOperation("name", process.argv[2]),
		voaMakePathReplaceOperation("date", new Date().toDateString()),
		voaMakePathReplaceOperation("time", new Date().toTimeString())
	];

	constructor(
		@inject("FileSystemUtils") private fs: IFilesystemUtils,
		@inject("PathUtils") private pathUtils: IPathUtils,
		@inject("Chalk") private chalk: Chalk
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
