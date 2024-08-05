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
import { ConsoleUtils, type IConsole } from "./console";
import { Factory, type IFactory } from "./factory";
import { Filesystem, type IFilesystem } from "./filesystem";
import { type IPaths, Paths } from "./paths";
import { type ISyntaxUtils, SyntaxUtils } from "./syntaxHighlighting";
import { type ITemplateUtils, TemplateUtils } from "./templates";

export * from "./cache";
export * from "./config";
export * from "./console";
export * from "./factory";
export * from "./filesystem";
export * from "./json";
export * from "./paths";
export * from "./syntaxHighlighting";
export * from "./templates";

export const utilityContainer = new Container();

utilityContainer.bind<IFilesystem>(TYPES.FileSystem).to(Filesystem);
utilityContainer
	.bind<INodeFsPromises>(TYPES.NodeFsPromises)
	.toConstantValue(fs.promises);
utilityContainer.bind<IConsole>(TYPES.Console).to(ConsoleUtils);
utilityContainer.bind<IPaths>(TYPES.Paths).to(Paths);
utilityContainer.bind<ILogger>(TYPES.Logger).toConstantValue(console);
utilityContainer.bind<Chalk>(TYPES.Chalk).toConstantValue(chalk);
utilityContainer.bind<ICliConfig>(TYPES.Config).to(CliConfig);
utilityContainer.bind<ISyntaxUtils>(TYPES.SyntaxHighlighting).to(SyntaxUtils);
utilityContainer.bind<IFactory>(TYPES.Factory).to(Factory);
utilityContainer.bind<ITemplateUtils>(TYPES.Templates).to(TemplateUtils);
