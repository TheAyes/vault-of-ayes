import type { FormatInputPathObject, ParsedPath } from "path";

export interface IPaths {
	normalize: (pathUrl: string) => string;
	join: (...paths: string[]) => string;
	dirname: (pathUrl: string) => string;
	resolve: (...paths: string[]) => string;
	basename: (path: string, ext?: string) => string;
	delimiter: string;
	extname: (pathString: string) => string;
	format: (pathObject: FormatInputPathObject) => string;
	isAbsolute: (path: string) => boolean;
	parse: (pathString: string) => ParsedPath;
	sep: string;
}
