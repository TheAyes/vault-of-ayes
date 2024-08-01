import type { IFilesystemUtils } from "@vault-of-ayes/filesystem";
import { type ILogger, TYPES } from "@vault-of-ayes/shared";
import { inject, injectable } from "inversify";
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
