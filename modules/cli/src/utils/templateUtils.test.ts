import { describe, test, expect, vi, beforeAll } from "vitest";
import { voaRetrieveTemplateFiles } from "./templateUtils.js";
import {vol} from "memfs"


describe.skip("voaRetrieveTemplateFiles function", () => {

	beforeAll(() => {
		//vol.promises.writeFile(".template/test.info", "Test info")
	})

	test("Given a directory path, when voaRetrieveTemplateFiles is invoked, then it should return the templates from the directory", async () => {

		const directoryPath = "./template";
		const result = await voaRetrieveTemplateFiles(directoryPath);
		expect(result).toBeDefined();
	});

	test("Given a directory path, when voaRetrieveTemplateFiles is invoked, then it should log a debug message", async () => {
		const directoryPath = "./template";
		vi.spyOn(global.console, "log");
		await voaRetrieveTemplateFiles(directoryPath);
		expect(console.log).toHaveBeenCalledWith(
			"Trying to retrieve templates from ./template",
			{ logLevel: "debug" }
		);
	});
});
