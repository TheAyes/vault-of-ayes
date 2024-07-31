import { inject, injectable } from "inversify";
import type { Chalk } from "../externals.interface.ts";
import { TYPES } from "../types.ts";
import type { ISyntaxUtils } from "./syntaxLoggingUtils.interface.ts";

@injectable()
export class SyntaxUtils implements ISyntaxUtils {
	public readonly timePattern: ISyntaxUtils["timePattern"] =
		"\\[\\d{2}:\\d{2}:\\d{2}]";
	public readonly syntaxMap;

	constructor(@inject(TYPES.Chalk) private chalk: Chalk) {
		this.syntaxMap = [
			{
				pattern: new RegExp(`${this.timePattern} (DEBUG)`),
				color: this.chalk.rgb(100, 100, 100)
			},

			{
				pattern: new RegExp(`${this.timePattern} (LOG)`),
				color: this.chalk.rgb(150, 150, 150)
			},
			{
				pattern: new RegExp(`${this.timePattern} (INFO)`),
				color: this.chalk.blue
			},
			{
				pattern: new RegExp(`${this.timePattern} (WARN)`),
				color: this.chalk.yellow
			},
			{
				pattern: new RegExp(`${this.timePattern} (ERROR)`),
				color: this.chalk.redBright
			},
			{
				pattern: new RegExp(`(${this.timePattern})`),
				color: this.chalk.blueBright
			},
			{
				pattern: /(".*"):/g,
				color: this.chalk.redBright
			},
			{
				pattern: /("[^"]*"),?\r?\n/g,
				color: this.chalk.greenBright
			},
			{
				pattern: /: (\d+)/g,
				color: this.chalk.blue
			},
			{
				pattern: /(?<!\d)([{}\][])(?!\d)/g,
				color: this.chalk.yellow
			}
		];
	}

	public colorSyntax = (message: string) =>
		this.syntaxMap.reduce(
			(previousMessage, currentSyntax) =>
				previousMessage.replace(
					currentSyntax.pattern,
					(substring, group1) =>
						substring.replace(group1, currentSyntax.color(group1))
				),
			message
		);
}
