import { injectable } from "tsyringe";
import type { IFactory } from "./factory.interface.ts";

@injectable()
export class Factory implements IFactory {
	public makeContentReplaceOperation: IFactory["makeContentReplaceOperation"] =
		(searchString: string, value: string) => (previousValue: string) =>
			previousValue.replaceAll(
				this.getContentReplacePattern(searchString),
				value
			);

	public makePathReplaceOperation: IFactory["makePathReplaceOperation"] =
		(searchString: string, value: string) => (previousValue: string) =>
			previousValue.replaceAll(
				this.getPathNameReplacePattern(searchString),
				value
			);

	public getContentReplacePattern: IFactory["getContentReplacePattern"] = (
		searchValue
	) => new RegExp(`\\$(?:\\{${searchValue}\}|${searchValue})`, "g");

	public getPathNameReplacePattern: IFactory["getPathNameReplacePattern"] = (
		searchValue
	) => new RegExp(`__${searchValue}__`, "g");
}
