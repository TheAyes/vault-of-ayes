---
tags:
  - til
  - typescript
  - dependencies
date-created: 25-06-2024
---

# Solving Circular Dependencies In TypeScript

Today, I faced an issue with circular dependencies in my TypeScript project. This led
to a situation where the program
attempted to run code that hadn't been initialized yet. Here's how the problem
manifested:

```
5855 | const files = [];
5856 | const directories = [];
5857 | const entries = await readdir(dir, {
5858 | encoding: "utf8"
5859 | });
5860 | const fullPath = voaPath.join(dir, entry);
						^ TypeError: undefined is not an object (evaluating 'voaPath.join') 
	at B:/~BUN/root/program:5860:29
```

## Cause of the Circular Dependency

My project consists of [pathUtils.ts](../../modules/cli/src/utils/pathUtils.ts), a
custom wrapper around Node's Path
class. The wrapper extends the functionality of the original class via logs and other
additional functions. I have a
similar wrapper, [
`filesystemUtils.ts`](../../modules/cli/src/utils/filesystemUtils.ts), for the
`node:fs/promises`
class.

A new feature added to [pathUtils](../../modules/cli/src/utils/pathUtils.ts)
introduced the circular dependency issue.
The feature comprised two functions:

```typescript
export const voaIsFileOrDir = async (filePath: string) => {
	const templateLStat = await voaLStat(filePath);
	const isFile = templateLStat.isFile();
	const isDir = templateLStat.isDirectory();

	return { isFile, isDir };
};
```

```typescript
export const voaExists = async (pathUrl: VoaPathLike) => {
	try {
		const normalizedPath = voaNormalize(pathUrl.toString());
		await voaAccess(normalizedPath);
		return true;
	} catch {
		return false;
	}
};
```

The addition of these functions created a circular dependency as [
`filesystemUtils.ts`](../../modules/cli/src/utils/filesystemUtils.ts) was already
depending on [
`pathUtils.ts`](../../modules/cli/src/utils/pathUtils.ts).

## The Breakdown and the Solution

Initially, I suspected that my bundler was the root cause, leading me to test several
different options. Taking a break
helped me rethink the problem. I decided to seek advice from AI.

The AI advised me to follow a series of debugging steps including checking for
circular dependencies, validating
imports/exports, restarting the development environment, and examining the TypeScript
configuration.

By implementing the proposed solutions, I realized that all I needed to do was to
move some of my code. Hence, I shifted
some functions from [`pathUtils.ts`](../../modules/cli/src/utils/pathUtils.ts) to [
`filesystemUtils.ts`](../../modules/cli/src/utils/filesystemUtils.ts). This change
successfully resolved the circular
dependency issue.

I'm now ready to face the next challenge, which might also be a circular dependency.
*sigh*