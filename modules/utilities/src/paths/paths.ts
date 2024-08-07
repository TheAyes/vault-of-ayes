import { type TNodePath, TYPES } from "@vault-of-ayes/shared";
import { inject, injectable } from "inversify";
import type { IConsole } from "../console";

import type { IPaths } from "./paths.interface.ts";

@injectable()
export class Paths implements IPaths {
	constructor(
		@inject(TYPES.NodePath) private nodePath: TNodePath,
		@inject(TYPES.Console) private console: IConsole
	) {}

	get sep() {
		return this.nodePath.sep;
	}

	get delimiter() {
		return this.nodePath.delimiter;
	}

	public format: IPaths["format"] = (pathObject) =>
		this.nodePath.format(pathObject);

	public extname: IPaths["extname"] = (pathString) =>
		this.nodePath.extname(pathString);

	// native path methods
	public basename: IPaths["basename"] = (pathString, extension) =>
		this.nodePath.basename(pathString, extension);

	public parse: IPaths["parse"] = (pathString) => {
		return this.nodePath.parse(pathString);
	};

	public isAbsolute: IPaths["isAbsolute"] = (pathString) => {
		return this.nodePath.isAbsolute(pathString);
	};

	public normalize: IPaths["normalize"] = (pathUrl) => {
		let result = this.nodePath.normalize(pathUrl);
		this.console.debug(`Normalized path:\n${pathUrl} -> ${result}`);

		if (process.platform === "win32") {
			if (/^[\\\/]/.test(pathUrl)) result = `C:${result}`;
		}

		if (process.platform !== "win32") result = result.replace(/[A-Z]:/, "");

		return result;
	};

	public join: IPaths["join"] = (...paths) => {
		this.console.log(`Joining paths: ${paths}`);

		const result: string = this.nodePath.join(...paths);
		this.console.log(`Paths joined: ${result}`);

		return this.normalize(result);
	};

	public dirname: IPaths["dirname"] = (pathUrl) => {
		return this.nodePath.dirname(pathUrl);
	};

	public resolve: IPaths["resolve"] = (...paths) => {
		return this.nodePath.resolve(...paths);
	};
}

export type { IPaths };
