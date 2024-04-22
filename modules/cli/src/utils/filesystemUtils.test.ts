// Import required modules
import { writeFile } from "fs/promises";
import { PathLike } from "node:fs";
import { readFile } from "node:fs/promises";
import { afterEach, describe, expect, test, vi } from "vitest";
import { VoaWriteFileOptions } from "../types.js";
import { voaReadFile, voaWriteFile } from "./filesystemUtils.js";

// Mock writeFile function
vi.mock("fs/promises", () => ({
	writeFile: vi.fn(),
	readFile: vi.fn()
}));

afterEach(() => {
	vi.restoreAllMocks();
});

// Test description
describe("`voaWriteFile` function tests", () => {
	test("Given file path, content and options, when not dry run, then writeFile runs with provided parameters", async () => {
		const file: PathLike = "/path/to/file.txt";
		const content: string = "Test content";
		const options: VoaWriteFileOptions = {
			dry: false
		};

		// TODO *1: Extend this using true in memory file systems, then validate that the content has been written/read to/from the correct file and can be used accordingly.
		await voaWriteFile(file, content, options);

		expect(writeFile).toBeCalledWith(file, content, "utf-8");
	});

	test("Given file path, content and options, when dry run, then writeFile does not run", async () => {
		const file: PathLike = "/path/to/file.txt";
		const content = "Test content";
		const options: VoaWriteFileOptions = {
			dry: true
		};

		// TODO *1
		await voaWriteFile(file, content, options);

		expect(writeFile).not.toBeCalled();
	});
});

describe("`voaReadFile` function tests", () => {
	test("Given a file path and options, when executed, then readFile runs with provided parameters", async () => {
		const file: PathLike = "/path/to/file.txt";

		// TODO *1
		await voaReadFile(file);

		expect(readFile).toBeCalledWith(file, "utf-8");
	});
});
