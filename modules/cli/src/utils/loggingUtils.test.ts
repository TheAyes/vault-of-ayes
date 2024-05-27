import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { cliConfig } from "../config.js";
import { VoaLogOptions } from "../types.js";
import { shouldLog, voaLog } from "./loggingUtils.js";

// Mock the CLI Config
vi.mock("../config.js");

beforeEach(() => {
	cliConfig.logLevel = "info";
	cliConfig.verbose = false;

	vi.spyOn(console, "log");
});

afterEach(() => {
	vi.restoreAllMocks();
});

describe("shouldLog function tests", () => {
	test("Given a verboseOnly flag, when shouldLog is called, then it should respect the verbosity setting", () => {
		const options: VoaLogOptions = {
			logLevel: "info",
			verboseOnly: true
		};
		cliConfig.verbose = true;
		const resultVerboseTrue = shouldLog(options);
		expect(resultVerboseTrue).toBe(true);

		cliConfig.verbose = false;
		const resultVerboseFalse = shouldLog(options);
		expect(resultVerboseFalse).toBe(false);
	});

	describe("Given a custom log level, when shouldLog is called, then it should correctly compare the custom and global log levels", () => {
		beforeEach(() => {
			cliConfig.logLevel = "warn";
		})


		test(`should not log if log level is below current log level`, () => {
			const options: VoaLogOptions = { logLevel: "info"};
			expect(shouldLog(options)).toBe(false);
		});

		test("should log if log level is equal current log level", () => {
			const options: VoaLogOptions = { logLevel: "warn"};
			expect(shouldLog(options)).toBe(true);
		});

		test("should log if log level is above current log level", () => {
			const options: VoaLogOptions = { logLevel: "error"};
			expect(shouldLog(options)).toBe(true);
		});

	});
});

describe("voaLog function tests", () => {
	beforeEach(() => {
		cliConfig.logLevel = "debug";
	})

	afterEach(() => {
		vi.restoreAllMocks();
	});

	test("'voaLog' should correctly log the message with appropriate log level and content", () => {
		voaLog("Test Message", { logLevel: "log", verboseOnly: false });
		expect(console.log).toHaveBeenCalled();
		expect(console.log).lastCalledWith(
			expect.stringContaining("Test Message")
		);
	});

	test("'voaLog' should not log the message when 'none' log level is set", () => {
		vi.spyOn(console, "log");
		voaLog("Test Message", { logLevel: "none", verboseOnly: false });
		expect(console.log).not.toHaveBeenCalled();
	});

	test("'voaLog' should not log the message when 'verboseOnly' is true and 'verbose' is false", () => {
		vi.spyOn(console, "log");
		cliConfig.verbose = false;
		voaLog("Test Message", { logLevel: "log", verboseOnly: true });
		expect(console.log).not.toHaveBeenCalled();
	});

	test("'voaLog' should log the message when 'verboseOnly' is true and 'verbose' is true", () => {
		vi.spyOn(console, "log");
		cliConfig.verbose = true;
		voaLog("Test Message", { logLevel: "log", verboseOnly: true });
		expect(console.log).toHaveBeenCalled();
		expect(console.log).lastCalledWith(
			expect.stringContaining("Test Message")
		);
	});
});
