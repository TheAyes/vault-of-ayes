export interface IJsonUtils {
	stringify: <T = unknown>(value: T) => string;
	parseJson: <T = unknown>(string: string) => T;
}
