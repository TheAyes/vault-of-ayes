import { TYPES } from "@vault-of-ayes/shared";
import { inject, injectable } from "inversify";
import type { ICliConfig } from "../config";

import type { IJsonUtils } from "./jsonUtils.interface.ts";

@injectable()
export class JsonUtils implements IJsonUtils {
	constructor(@inject(TYPES.Config) private config: ICliConfig) {}

	public stringify: IJsonUtils["stringify"] = (value) =>
		JSON.stringify(value, null, this.config.indentSize);

	public parseJson: IJsonUtils["parseJson"] = (text) => JSON.parse(text);
}
