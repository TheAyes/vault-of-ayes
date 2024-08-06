import {afterEach, beforeEach, describe, expect, test, vi} from "vitest";

vi.mock("../config.js");

const setLogLevel = (level: typeof cliConfig.logLevel) => {
	cliConfig.logLevel = level;
};

const optionsFactory = (level: typeof cliConfig.logLevel, verboseOnly = false): VoaLogOptions => ({
	logLevel: level,
	verboseOnly
});

describe("Logger functions tests", () => {
	beforeEach(() => {
		vi.spyOn(console, "log");
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("shouldLog function tests", () => {
		test("Given verbosity setting and verboseOnly flag, When shouldLog is called, Then it returns whether to log based on verbosity", () => {
			setLogLevel("info");
			cliConfig.verbose = true;
			const resultVerboseTrue = shouldLog(optionsFactory("info", true));
			expect(resultVerboseTrue).toBe(true);
			cliConfig.verbose = false;
			const resultVerboseFalse = shouldLog(optionsFactory("info", true));
			expect(resultVerboseFalse).toBe(false);
		});

		describe("When shouldLog is called with a custom log level, Then it should return whether to log based on comparison of log levels", () => {
			beforeEach(() => {
				setLogLevel("warn");
			});

			test(`Given log level below current log level, When shouldLog is called, Then it returns false`, () => {
				expect(shouldLog(optionsFactory("info"))).toBe(false);
			});

			test("Given log level equal to current, when shouldLog is called, Then it returns true", () => {
				expect(shouldLog(optionsFactory("warn"))).toBe(true);
			});

			test("Given log level above current, When shouldLog is called, Then it returns true", () => {
				expect(shouldLog(optionsFactory("error"))).toBe(true);
			});
		});
	});

	describe("voaLog function tests", () => {
		beforeEach(() => {
			setLogLevel("debug");
		});

		test("Given log level and message, When voaLog is called, Then it logs the message with appropriate contents", () => {
			voaLog("Test Message", optionsFactory("log"));
			expect(console.log).toHaveBeenCalled();
			expect(console.log).lastCalledWith(expect.stringContaining("Test Message"));
		});

		test("Given none log level, When voaLog is called, Then it does not log the message", () => {
			voaLog("Test Message", optionsFactory("none"));
			expect(console.log).not.toHaveBeenCalled();
		});

		test("Given verboseOnly set to true and verbose set to false, When voaLog is called, Then it does not log the message", () => {
			cliConfig.verbose = false;
			voaLog("Test Message", optionsFactory("log", true));
			expect(console.log).not.toHaveBeenCalled();
		});

		test("Given verboseOnly set to true and verbose set to true, When voaLog is called, Then it logs the message", () => {
			cliConfig.verbose = true;
			voaLog("Test Message", optionsFactory("log", true));
			expect(console.log).toHaveBeenCalled();
			expect(console.log).lastCalledWith(expect.stringContaining("Test Message"));
		});
	});
});