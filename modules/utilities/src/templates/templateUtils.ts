import { type INodeFsPromises, TYPES } from "@vault-of-ayes/shared";
import { inject, injectable } from "inversify";
import type { IConsole } from "../console";
import type { IFilesystem } from "../filesystem";
import type { IPaths } from "../paths";
import type { ITemplateUtils } from "./templateUtils.interface.ts";

type FileNode = {
	type: "file";
	name: string;
};

type DirectoryNode = {
	type: "directory";
	name: string;
	children?: (FileNode | DirectoryNode)[];
};

@injectable()
export class TemplateUtils implements ITemplateUtils {
	constructor(
		@inject(TYPES.Logger) private console: IConsole,
		@inject(TYPES.FileSystem) private fs: IFilesystem,
		@inject(TYPES.NodeFsPromises) private nodeFs: INodeFsPromises,
		@inject(TYPES.Paths) private paths: IPaths
	) {}

	public retrieveTemplateFiles: ITemplateUtils["retrieveTemplateFiles"] =
		async (directoryPath) => {
			let directoryTree: DirectoryNode;

			const readDirDeep = async (startDir: string) => {
				const node: DirectoryNode = {
					name: this.paths.basename(startDir),
					type: "directory"
				};

				const currentDirContents = await this.fs.readDir(directoryPath);

				for (const item of currentDirContents) {
					const stats = await this.fs.lStat(item);

					const type:
						| FileNode["type"]
						| DirectoryNode["type"]
						| undefined = stats.isDirectory()
						? "directory"
						: stats.isFile()
							? "file"
							: undefined;

					if (stats.isDirectory()) {
						await readDirDeep(item);
					}
				}
			};
			return;
		};
}
