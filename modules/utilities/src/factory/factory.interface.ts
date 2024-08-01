export interface IFactory {
	getContentReplacePattern: (searchValue: string) => RegExp;
	getPathNameReplacePattern: (searchValue: string) => RegExp;

	makeContentReplaceOperation: (
		searchString: string,
		replaceWith: string
	) => (previousValue: string) => string;

	makePathReplaceOperation: (
		searchString: string,
		replaceWith: string
	) => (previousValue: string) => string;
}
