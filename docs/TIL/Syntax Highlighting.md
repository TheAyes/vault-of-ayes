---
tags:
  - til
  - typescript
date-created: 06-06-2024
---

Today I added some [syntax highlighting](../../modules/cli/src/utils/syntaxLoggingUtils.ts) to my console logging functions. Figuring out
the Regex was quite simple until I came across strings in json arrays... With some
data looking like this:

```json
{
	"key1": [
		"value1",
		"value2",
		"value3"
	],
	"otherKey": "Foo"
}
```

It was rather hard to find a perfect match since I can't "override" an existing
coloring. So if I match anything twice the output would be broken.
In the end I managed to find a great working regex for strings in JSON:

```regex
/("[^"]*"),?\r?\n/g
```

This targets all string values without recoloring the keys. Great. Next I just apply
colors to these matches using chalk.

> [!Info]
>
> I only apply colors to the first matching group. I do this in order to be able to
> match characters I don't want to colorize. This leads to more accurate matches.
> ```typescript
> export const colorSyntax = (message: string) => syntaxMap.reduce(  
>	(previousMessage, currentSyntax) =>  
>		 previousMessage.replace(  
>		   currentSyntax.pattern,  
>		   (substring, group1) =>  
>			  substring.replace(group1, currentSyntax.color(group1))  
>		),  
>	 message  
> );
> ```

Here's all of my colors just in case you'd like to have a reference:

```typescript
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
```

I can now enjoy some nice colored JSON in my terminal! \\(^-^)/