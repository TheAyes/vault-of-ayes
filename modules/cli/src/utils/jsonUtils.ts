import { inject, injectable } from "inversify";

import type { ICliConfig } from "../config.interface.ts";
import { TYPES } from "../types.ts";
import type { IJsonUtils } from "./jsonUtils.interface.ts";

@injectable()
export class JsonUtils implements IJsonUtils {
	constructor(@inject(TYPES.CliConfig) private config: ICliConfig) {}

	public stringify: IJsonUtils["stringify"] = (value) =>
		JSON.stringify(value, null, this.config.indentSize);

	public parseJson: IJsonUtils["parseJson"] = (text) => JSON.parse(text);
}
