import chalk from "chalk";
import { Container } from "inversify";
import * as console from "node:console";
import * as fs from "node:fs";
import type { Chalk, ILogger, INodeFsPromises } from "./externals.interface.ts";
import type { IConsoleUtils } from "./utils/consoleUtils.interface.ts";
import { ConsoleUtils } from "./utils/consoleUtils.ts";
import type { IFilesystemUtils } from "./utils/filesystemUtils.interface.ts";
import { FilesystemUtils } from "./utils/filesystemUtils.ts";
import type { IPathUtils } from "./utils/pathUtils.interface.ts";
import { PathUtils } from "./utils/pathUtils.ts";

const container = new Container();

container.bind<IFilesystemUtils>("FilesystemUtils").to(FilesystemUtils);
container.bind<INodeFsPromises>("NodeFsPromises").toConstantValue(fs.promises);
container.bind<IConsoleUtils>("ConsoleUtils").to(ConsoleUtils);
container.bind<IPathUtils>("PathUtils").to(PathUtils);
container.bind<ILogger>("Logger").toConstantValue(console);
container.bind<Chalk>("Chalk").toConstantValue(chalk);
