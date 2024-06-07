import chalk from "chalk";

const timePattern = "\\[\\d{2}:\\d{2}:\\d{2}]";
const syntaxMap = [
	{
		pattern: new RegExp(`${timePattern} (DEBUG)`),
		color: chalk.rgb(100, 100, 100)
	},
	{
		pattern: new RegExp(`${timePattern} (LOG)`),
		color: chalk.rgb(150, 150, 150)
	},
	{
		pattern: new RegExp(`${timePattern} (INFO)`),
		color: chalk.blue
	},
	{
		pattern: new RegExp(`${timePattern} (WARN)`),
		color: chalk.yellow
	},
	{
		pattern: new RegExp(`${timePattern} (ERROR)`),
		color: chalk.redBright
	},
	{
		pattern: new RegExp(`(${timePattern})`),
		color: chalk.blueBright
	},
	{
		pattern: /(".*"):/g,
		color: chalk.redBright
	},
	{
		pattern: /("[^"]*"),?\r?\n/g,
		color: chalk.greenBright
	},
	{
		pattern: /: (\d+)/g,
		color: chalk.blue
	},
	{
		pattern: /(?<!\d)([{}\][])(?!\d)/g,
		color: chalk.yellow
	}
];

export const colorSyntax = (message: string) =>
	syntaxMap.reduce(
		(previousMessage, currentSyntax) =>
			previousMessage.replace(
				currentSyntax.pattern,
				(substring, group1) =>
					substring.replace(group1, currentSyntax.color(group1))
			),
		message
	);
