import type { IFunctionFactories } from "./functionFactories.interface.ts";

export class FunctionFactory implements IFunctionFactories {
	public makeContentReplaceOperation: IFunctionFactories["makeContentReplaceOperation"] =
		(searchString: string, value: string) => (previousValue: string) =>
			previousValue.replaceAll(
				this.getContentReplacePattern(searchString),
				value
			);

	public makePathReplaceOperation: IFunctionFactories["makePathReplaceOperation"] =
		(searchString: string, value: string) => (previousValue: string) =>
			previousValue.replaceAll(
				this.getPathNameReplacePattern(searchString),
				value
			);

	public getContentReplacePattern: IFunctionFactories["getContentReplacePattern"] =
		(searchValue) =>
			new RegExp(`\\$(?:\\{${searchValue}\}|${searchValue})`, "g");

	public getPathNameReplacePattern: IFunctionFactories["getPathNameReplacePattern"] =
		(searchValue) => new RegExp(`__${searchValue}__`, "g");
}
