import type { VoaObjectEncodingOptions } from "@vault-of-ayes/cli/src/types.ts";
import type * as fs from "node:fs/promises";

export interface FileSystem {
	readFile: ;

	writeFile: (
		path: string | URL,
		content: string,
		options?: VoaObjectEncodingOptions
	) => Promise<void>;

	readDir: (path: string | URL) => Promise<string[]>;
	mkDir: (path: string | URL, recursive?: boolean) => Promise<void>;

	isFile: (path: string | URL) => Promise<boolean>;
	isDir: (path: string | URL) => Promise<boolean>;

	exists: (path: string | URL) => Promise<boolean>;
	access: (path: string | URL) => Promise<boolean>;
}
