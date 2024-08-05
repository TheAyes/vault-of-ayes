import { TYPES } from "@vault-of-ayes/shared";
import { inject, injectable } from "inversify";
import type * as pathModule from "node:path";
import type { IConsole } from "../console";

import type { IPaths } from "./paths.interface.ts";

@injectable()
export class Paths implements IPaths {
	constructor(
		@inject(TYPES.Paths) private path: typeof pathModule,
		@inject(TYPES.Console) private logger: IConsole
	) {}

	get sep() {
		return this.path.sep;
	}

	get delimiter() {
		return this.path.delimiter;
	}

	public format: IPaths["format"] = (pathObject) =>
		this.path.format(pathObject);

	public extname: IPaths["extname"] = (pathString) =>
		this.path.extname(pathString);

	// native path methods
	public basename: IPaths["basename"] = (pathString, extension) =>
		this.path.basename(pathString, extension);

	public parse: IPaths["parse"] = (pathString) => {
		return this.path.parse(pathString);
	};

	public isAbsolute: IPaths["isAbsolute"] = (pathString) => {
		return this.path.isAbsolute(pathString);
	};

	public normalize: IPaths["normalize"] = (pathUrl) => {
		let result = this.normalize(pathUrl);
		this.logger.log(`Normalized path:\n${pathUrl} -> ${result}`);

		if (process.platform === "win32") {
			if (/^[\\\/]/.test(pathUrl)) result = `C:${result}`;
		}

		if (process.platform !== "win32") result = result.replace(/[A-Z]:/, "");

		return result;
	};

	public join: IPaths["join"] = (...paths) => {
		this.logger.log(`Joining paths: ${paths}`);

		const result: string = this.path.join(...paths);
		this.logger.log(`Paths joined: ${result}`);

		return this.normalize(result);
	};

	public dirname: IPaths["dirname"] = (pathUrl) => {
		return this.path.dirname(pathUrl);
	};

	public resolve: IPaths["resolve"] = (...paths) => {
		return this.path.resolve(...paths);
	};
}

export type { IPaths };
