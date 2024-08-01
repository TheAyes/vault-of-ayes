import {
	type Chalk,
	type ILogger,
	type INodeFsPromises,
	TYPES
} from "@vault-of-ayes/shared";
import chalk from "chalk";
import { Container } from "inversify";
import console from "node:console";
import fs from "node:fs";
import { CliConfig, type ICliConfig } from "./config";
import { ConsoleUtils, type IConsoleUtils } from "./console";
import { FunctionFactory, type IFactory } from "./factories";
import { FilesystemUtils, type IFilesystemUtils } from "./filesystem";
import { type IPaths, Paths } from "./paths";
import { type ISyntaxUtils, SyntaxUtils } from "./syntaxHighlighting";

export * from "./cache";
export * from "./config";
export * from "./console";
export * from "./factories";
export * from "./filesystem";
export * from "./json";
export * from "./paths";
export * from "./syntaxHighlighting";
export * from "./templates";

export const utilityContainer = new Container();

utilityContainer
	.bind<IFilesystemUtils>(TYPES.FileSystemUtils)
	.to(FilesystemUtils);
utilityContainer
	.bind<INodeFsPromises>(TYPES.NodeFsPromises)
	.toConstantValue(fs.promises);
utilityContainer.bind<IConsoleUtils>(TYPES.ConsoleUtils).to(ConsoleUtils);
utilityContainer.bind<IPaths>(TYPES.PathUtils).to(Paths);
utilityContainer.bind<ILogger>(TYPES.Logger).toConstantValue(console);
utilityContainer.bind<Chalk>(TYPES.Chalk).toConstantValue(chalk);
utilityContainer.bind<ICliConfig>(TYPES.Config).to(CliConfig);
utilityContainer.bind<ISyntaxUtils>(TYPES.SyntaxUtils).to(SyntaxUtils);
utilityContainer.bind<IFactory>(TYPES.Factory).to(FunctionFactory);
