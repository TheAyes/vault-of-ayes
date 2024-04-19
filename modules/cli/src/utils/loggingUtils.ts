import { cliConfig } from "../config.js";
import { VoaLogFunction, VoaLogOptions } from "../types.js";
import { colorSyntax } from "./syntaxLogginUtils.js";

export const logLevels = [
	"debug",
	"log",
	"info",
	"warn",
	"error",
	"none"
] as const;

export const shouldLog = ({
	logLevel = "log",
	verboseOnly = false
}: VoaLogOptions = {}): boolean => {
	// Exit early if global log level is set to "none"
	if (cliConfig.logLevel === "none") return false;

	// Introduce variable for index comparison to make the logic understandable
	const logLevelComparison =
		logLevels.indexOf(logLevel) <= logLevels.indexOf(cliConfig.logLevel);

	return logLevelComparison && !(verboseOnly && !cliConfig.verbose);
};

export const voaLog: VoaLogFunction = (
	message,
	{ logLevel = "log", verboseOnly = false }: VoaLogOptions = {}
) => {
	if (!shouldLog({ logLevel, verboseOnly }) || logLevel === "none") return;
	const logLevelPrefix = `[ ${logLevel.padEnd(5)} - ${new Date().toLocaleTimeString()} ] `;
	message = `${logLevelPrefix} ${message}`;
	const coloredMessage = colorSyntax(message);

	console[logLevel](coloredMessage);
};

export const voaFormatFunctionCallLog = (message: string) => {};
