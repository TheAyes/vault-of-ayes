import type { ChalkInstance } from "chalk";

export interface ISyntaxUtils {
	timePattern: string;
	syntaxMap: Array<{
		pattern: RegExp;
		color: ChalkInstance;
	}>;
	colorSyntax: (content: string) => string;
}
