import { TYPES } from "@vault-of-ayes/shared";
import chalk from "chalk";
import { Container } from "inversify";
import console from "node:console";
import fs from "node:fs";
import * as path from "node:path";
import { Cache } from "./cache";
import { CliConfig } from "./config";
import { ConsoleUtils } from "./console";
import { Factory } from "./factory";
import { Filesystem } from "./filesystem";
import { Paths } from "./paths";
import { SyntaxUtils } from "./syntaxHighlighting";
import { TemplateUtils } from "./templates";

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

type Registrations = {
	type: "bind" | "bindInstance" | "bindSingleton";
	identifier: symbol;
	value?: any;
	impl?: any;
}[];

const registerDependencies = (
	forContainer: Container,
	registrations: Registrations
) => {
	registrations.forEach((registration) => {
		switch (registration.type) {
			case "bind":
				if (registration.impl) {
					forContainer
						.bind(registration.identifier)
						.to(registration.impl);
				}
				break;
			case "bindInstance":
				if (registration.value) {
					forContainer
						.bind(registration.identifier)
						.toConstantValue(registration.value);
				}
				break;
			case "bindSingleton":
				if (registration.impl) {
					forContainer
						.bind(registration.identifier)
						.to(registration.impl)
						.inSingletonScope();
				}
				break;
			default:
				throw new Error(
					`Unknown registration type: ${registration.type}`
				);
		}
	});
};

registerDependencies(utilityContainer, [
	{ type: "bind", identifier: TYPES.FileSystem, impl: Filesystem },
	{ type: "bind", identifier: TYPES.Console, impl: ConsoleUtils },
	{ type: "bind", identifier: TYPES.Paths, impl: Paths },
	{
		type: "bind",
		identifier: TYPES.SyntaxHighlighting,
		impl: SyntaxUtils
	},
	{ type: "bind", identifier: TYPES.Factory, impl: Factory },
	{ type: "bind", identifier: TYPES.Templates, impl: TemplateUtils },
	{ type: "bind", identifier: TYPES.Cache, impl: Cache },
	{ type: "bindInstance", identifier: TYPES.Logger, value: console },
	{ type: "bindInstance", identifier: TYPES.Chalk, value: chalk },
	{ type: "bindInstance", identifier: TYPES.NodePath, value: path },
	{
		type: "bindInstance",
		identifier: TYPES.NodeFsPromises,
		value: fs.promises
	},
	{ type: "bindSingleton", identifier: TYPES.Config, impl: CliConfig }
]);
