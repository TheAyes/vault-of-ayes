import { inject, injectable } from "inversify";
import type { IConsoleUtils } from "../console";

import type { IPaths } from "./paths.interface.ts";

@injectable()
export class Paths implements IPaths {
	constructor(
		@inject("PathUtils") private path: IPaths,
		@inject("ConsoleUtils") private consoleUtils: IConsoleUtils
	) {}

	// native path methods
	get basename() {
		return this.path.basename;
	}

	get delimiter() {
		return this.path.delimiter;
	}

	get extname() {
		return this.path.extname;
	}

	get format() {
		return this.path.format;
	}

	get isAbsolute() {
		return this.path.isAbsolute;
	}

	get parse() {
		return this.path.parse;
	}

	get sep() {
		return this.path.sep;
	}

	normalize(pathUrl: string) {
		let result = this.path.normalize(pathUrl);
		this.consoleUtils.log(`Normalized path:\n${pathUrl} -> ${result}`);

		if (process.platform === "win32") {
			if (/^[\\\/]/.test(pathUrl)) result = `C:${result}`;
		}
		if (process.platform !== "win32") result = result.replace(/[A-Z]:/, "");

		return result;
	}

	join(...paths: string[]) {
		this.consoleUtils.log(`Joining paths: ${paths}`);

		const result: string = this.path.join(...paths);
		this.consoleUtils.log(`Paths joined: ${result}`);

		return this.normalize(result);
	}

	dirname(pathUrl: string) {
		return this.path.dirname(pathUrl);
	}

	resolve(...paths: string[]) {
		return this.path.resolve(...paths);
	}
}

export type { IPaths };
