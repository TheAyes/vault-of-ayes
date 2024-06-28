import type { Command } from "@commander-js/extra-typings";
import type chalk from "chalk";
import console from "node:console";
import fs from "node:fs";

export interface ILogger {
	debug: typeof console.debug;

	log: typeof console.log;

	info: typeof console.info;

	warn: typeof console.warn;

	error: typeof console.error;
}

export interface INodeFsPromises {
	access: typeof fs.promises.access;
	lstat: typeof fs.promises.lstat;
	mkdir: typeof fs.promises.mkdir;
	readdir: typeof fs.promises.readdir;
	readFile: typeof fs.promises.readFile;
	writeFile: typeof fs.promises.writeFile;
}

export type Chalk = typeof chalk;

export type ICommand = typeof Command;
