import { inject, injectable } from "inversify";
import type { IConsoleUtils } from "./filesystemUtils.ts";

import type { IPathUtils } from "./pathUtils.interface.ts";

@injectable()
export class PathUtils implements IPathUtils {
	constructor(
		@inject("PathUtils") private path: IPathUtils,
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
		this.consoleUtils.voaLog(`Normalizing path: ${pathUrl}`, {
			logLevel: "debug",
			verboseOnly: true
		});

		let result = this.path.normalize(pathUrl);
		this.consoleUtils.voaLog(`Normalized path to: ${result}`, {
			logLevel: "debug",
			verboseOnly: true
		});

		if (process.platform === "win32") {
			if (/^[\\\/]/.test(pathUrl)) result = `C:${result}`;
		}
		if (process.platform !== "win32") result = result.replace(/[A-Z]:/, "");

		return result;
	}

	join(...paths: string[]) {
		this.consoleUtils.voaLog(`Joining paths: ${paths}`, {
			logLevel: "debug",
			verboseOnly: true
		});

		const result: string = this.path.join(...paths);
		this.consoleUtils.voaLog(`Paths joined: ${result}`, {
			logLevel: "debug",
			verboseOnly: true
		});

		return this.normalize(result);
	}

	dirname(pathUrl: string) {
		return this.path.dirname(pathUrl);
	}

	resolve(...paths: string[]) {
		return this.path.resolve(...paths);
	}
}
