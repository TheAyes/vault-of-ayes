import { describe, test, expect, vi, beforeAll, afterEach } from "vitest";
import { voaRetrieveTemplateFiles } from "./templateUtils.js";
import {type fs, vol} from "memfs";


vi.mock("node:fs/promises", async () => {
	const memfs: { fs: typeof fs } = await vi.importActual("memfs");

	return memfs.fs.promises;
});

afterEach(() => {
	vol.reset();
	vi.restoreAllMocks();
});


describe.skip("voaRetrieveTemplateFiles function", () => {
	test("Given a directory path, when voaRetrieveTemplateFiles is invoked, then it should return the templates from the directory", async () => {
		vol.fromNestedJSON({
			"templates": {
				"exampleTemplate": ""
			}
		})

		const directoryPath = "./template";
		const result = await voaRetrieveTemplateFiles(directoryPath);
		expect(result).toBeDefined();
	});
});
