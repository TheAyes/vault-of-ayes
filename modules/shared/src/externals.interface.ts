import type chalk from "chalk";
import console from "node:console";
import fs from "node:fs";
import * as path from "node:path";

export interface ILogger {
	debug: typeof console.debug;
	log: typeof console.log;
	info: typeof console.info;
	warn: typeof console.warn;
	error: typeof console.error;
}

export type INodeFsPromises = typeof fs{
	/*access: typeof fs.promises.access;
	lstat: typeof fs.promises.lstat;
	mkdir: typeof fs.promises.mkdir;
	readdir: typeof fs.promises.readdir;
	readFile: typeof fs.promises.readFile;
	writeFile: typeof fs.promises.writeFile;*/
}

export type TChalk = typeof chalk;

export type TNodePath = typeof path;
