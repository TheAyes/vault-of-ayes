import chalk from "chalk";
import { Container } from "inversify";
import * as console from "node:console";
import * as fs from "node:fs";
import type { Chalk, ILogger, INodeFsPromises } from "./externals.interface.ts";
import { TYPES } from "./types.ts";
import type { IConsoleUtils } from "./utils/consoleUtils.interface.ts";
import { ConsoleUtils } from "./utils/consoleUtils.ts";
import type { IFilesystemUtils } from "./utils/filesystemUtils.interface.ts";
import { FilesystemUtils } from "./utils/filesystemUtils.ts";
import type { IPathUtils } from "./utils/pathUtils.interface.ts";
import { PathUtils } from "./utils/pathUtils.ts";

const container = new Container();

container.bind<IFilesystemUtils>(TYPES.FileSystemUtils).to(FilesystemUtils);
container
	.bind<INodeFsPromises>(TYPES.NodeFsPromises)
	.toConstantValue(fs.promises);
container.bind<IConsoleUtils>(TYPES.ConsoleUtils).to(ConsoleUtils);
container.bind<IPathUtils>(TYPES.PathUtils).to(PathUtils);
container.bind<ILogger>(TYPES.Logger).toConstantValue(console);
container.bind<Chalk>(TYPES.Chalk).toConstantValue(chalk);
