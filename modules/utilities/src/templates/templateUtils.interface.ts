export interface ITemplateUtils {
	retrieveTemplateFiles: (directory: string) => Promise<string[]>;
}
