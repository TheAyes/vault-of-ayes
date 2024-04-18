import chalk from "chalk";

const syntaxMap = [
	{
		pattern: /\[ *debug *- *\d{2}:\d{2}:\d{2} *].+$/g,
		color: chalk.rgb(80, 80, 80)
	},
	{
		pattern: /\[ *log *- *\d{2}:\d{2}:\d{2} *].+$/g,
		color: chalk.rgb(150, 150, 150)
	},
	{
		pattern: /\[ *info *- *\d{2}:\d{2}:\d{2} *].+$/g,
		color: chalk.blue
	},
	{
		pattern: /\[ *warn *- *\d{2}:\d{2}:\d{2} *].+$/g,
		color: chalk.yellow
	},
	{
		pattern: /\[ *error *- *\d{2}:\d{2}:\d{2} *].+$/g,
		color: chalk.redBright
	}
];

export const colorSyntax = (message: string) =>
	syntaxMap.reduce(
		(previousMessage, currentSyntax) =>
			previousMessage.replace(currentSyntax.pattern, (substring) =>
				currentSyntax.color(substring)
			),
		message
	);
