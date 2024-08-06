import { TYPES } from "@vault-of-ayes/shared";
import { inject, injectable } from "inversify";
import type { IConsole } from "../console";
import type { IFilesystem } from "../filesystem";
import type { ITemplateUtils } from "./templateUtils.interface.ts";

@injectable()
export class TemplateUtils implements ITemplateUtils {
	constructor(
		@inject(TYPES.Logger) private console: IConsole,
		@inject(TYPES.FileSystem) private fs: IFilesystem
	) {}

	public retrieveTemplateFiles: ITemplateUtils["retrieveTemplateFiles"] =
		async (directoryPath) => {
			this.console.log(
				`Trying to retrieve templates from ${directoryPath}`
			);
			return await this.fs.readDir(directoryPath);
		};
}
