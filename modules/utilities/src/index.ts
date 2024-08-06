import { TYPES } from "@vault-of-ayes/shared";
import chalk from "chalk";
import console from "node:console";
import fs from "node:fs";
import * as path from "node:path";
import { container, type DependencyContainer } from "tsyringe";
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

export const utilityContainer = container.createChildContainer();

type Registrations = {
	type: "register" | "registerInstance" | "registerSingleton";
	identifier: symbol;
	value?: any;
	impl?: any;
}[];

const registerDependencies = (
	forContainer: DependencyContainer,
	registrations: Registrations
) => {
	registrations.forEach((registration) => {
		switch (registration.type) {
			case "register":
				if (registration.impl) {
					forContainer.register(registration.identifier, {
						useClass: registration.impl
					});
				}
				break;
			case "registerInstance":
				if (registration.value) {
					forContainer.registerInstance(
						registration.identifier,
						registration.value
					);
				}
				break;
			case "registerSingleton":
				if (registration.impl) {
					forContainer.registerSingleton(
						registration.identifier,
						registration.impl
					);
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
	{ type: "register", identifier: TYPES.FileSystem, impl: Filesystem },
	{ type: "register", identifier: TYPES.Console, impl: ConsoleUtils },
	{ type: "register", identifier: TYPES.Paths, impl: Paths },
	{
		type: "register",
		identifier: TYPES.SyntaxHighlighting,
		impl: SyntaxUtils
	},
	{ type: "register", identifier: TYPES.Factory, impl: Factory },
	{ type: "register", identifier: TYPES.Templates, impl: TemplateUtils },
	{ type: "register", identifier: TYPES.Cache, impl: Cache },
	{ type: "registerInstance", identifier: TYPES.Logger, value: console },
	{ type: "registerInstance", identifier: TYPES.Chalk, value: chalk },
	{ type: "registerInstance", identifier: TYPES.NodePath, value: path },
	{
		type: "registerInstance",
		identifier: TYPES.NodeFsPromises,
		value: fs.promises
	},
	{ type: "registerSingleton", identifier: TYPES.Config, impl: CliConfig }
]);
