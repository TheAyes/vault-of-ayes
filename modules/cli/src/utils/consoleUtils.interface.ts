export interface IConsoleUtils {
	/*
		start: (message: string, func: () => void | Promise<void>) => Promise<void>;
	*/
	log: (message: any) => void;
	info: (message: any) => void;
	warn: (message: any) => void;
	error: (message: any) => void;
}
