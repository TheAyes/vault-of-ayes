import { inject, injectable } from "inversify";
import type { ILogger } from "../externals.interface.ts";
import { TYPES } from "../types.ts";
import type { IFilesystemUtils } from "./filesystemUtils.interface.ts";
import type { ITemplateUtils } from "./templateUtils.interface.ts";

@injectable()
export class TemplateUtils implements ITemplateUtils {
	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.FileSystemUtils) private fs: IFilesystemUtils
	) {}

	public retrieveTemplateFiles: ITemplateUtils["retrieveTemplateFiles"] =
		async (directoryPath) => {
			this.logger.debug(
				`Trying to retrieve templates from ${directoryPath}`
			);
			return await this.fs.voaReadDir(directoryPath);
		};
}
