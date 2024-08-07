import {
	type ILogger,
	type TChalk,
	type TNodePath,
	TYPES
} from "@vault-of-ayes/shared";
import { mock } from "bun:test";
import chalk from "chalk";
import { Container } from "inversify";
import * as nodeFsPromises from "node:fs/promises";
import * as nodePath from "node:path";
import {
	Cache,
	CliConfig,
	ConsoleUtils,
	Factory,
	Filesystem,
	type ICache,
	type ICliConfig,
	type IConsole,
	type IFactory,
	type IFilesystem,
	type IPaths,
	type ISyntaxUtils,
	Paths,
	SyntaxUtils
} from "../src";

mock.module("node:fs/promises", async () => {
	return await import("memfs");
});

/*describe("Filesystem Class", () => {*/
let filesystemContainer: Container;
let filesystem: IFilesystem;

filesystemContainer = new Container();

filesystemContainer.bind(TYPES.NodeFsPromises).toConstantValue(nodeFsPromises);
filesystemContainer.bind<IConsole>(TYPES.Console).to(ConsoleUtils);
filesystemContainer.bind<IPaths>(TYPES.Paths).to(Paths);
filesystemContainer.bind<ICache>(TYPES.Cache).to(Cache);
filesystemContainer.bind<IFilesystem>(TYPES.FileSystem).to(Filesystem);
filesystemContainer.bind<ILogger>(TYPES.Logger).toConstantValue(console);
filesystemContainer.bind<ICliConfig>(TYPES.Config).to(CliConfig);
filesystemContainer.bind<TChalk>(TYPES.Chalk).toConstantValue(chalk);
filesystemContainer.bind<IFactory>(TYPES.Factory).to(Factory);
filesystemContainer
	.bind<ISyntaxUtils>(TYPES.SyntaxHighlighting)
	.to(SyntaxUtils);
filesystemContainer.bind<TNodePath>(TYPES.NodePath).toConstantValue(nodePath);

/*/!*describe("exists", () => {*!/
it("should return true when a file exists", async () => {
	const result = await filesystem.exists("/path/to/file");
	expect(result).toBe(false);
}, 200);
it("should return false when a file does not exist", async () => {
	const result = await filesystem.exists("/path/to/file");
	expect(result).toBe(false);
}, 200);
/!*});*!/*/
/*
	describe("makeFile Function", () => {
		it("should create a file", async () => {
			const filepath = "file";

			await filesystem.makeFile(filepath, "");

			const result = await filesystem.exists(filepath);
			expect(result).toBe(true);
		}, 200);

		/!*it("should throw an error if the file already exists", async () => {
			const filepath = "file";

			expect(await filesystem.makeFile("file", "")).toThrowError();
		});

		it("should throw an error if the user has insufficient permissions", async () => {
			const filepath = "file";

			expect(await filesystem.makeFile("file", "")).toThrowError();
		});*!/
	});*/
/*});*/
