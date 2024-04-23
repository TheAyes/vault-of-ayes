// Import required modules
import { PathLike } from "node:fs";
import { lstat, readFile, writeFile } from "node:fs/promises";
import path from "path";
import { afterEach, describe, expect, test, vi } from "vitest";
import { VoaWriteFileOptions } from "../types.js";
import { voaReadFile, voaWriteFile } from "./filesystemUtils.js";
import { voaIsFileOrDir, voaNormalize } from "./pathUtils.js";

// Mock writeFile function
vi.mock("node:fs/promises", async () => {
	const originalFs = await vi.importActual("node:fs/promises");

	return {
		// TODO: *1 Extend this using true in memory file systems, then validate that the content has been written/read to/from the correct file and can be used accordingly.
		writeFile: vi.fn(),
		readFile: vi.fn(),
		lstat: originalFs.lstat
	};
});

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

		// TODO: *1
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

describe("`voaIsFileOrDir` function tests", () => {
	test("Given a file path, when checked, then returns that it is a file not a directory", async () => {
		const filePath = "./modules/cli/package.json";
		const result = await voaIsFileOrDir(filePath);
		expect(result).toStrictEqual({ isDir: false, isFile: true });
	});

	test("Given a directory path, when checked, then returns that it is a directory not a file", async () => {
		const filePath = "./modules/cli/src";
		const result = await voaIsFileOrDir(filePath);
		expect(result).toStrictEqual({ isDir: true, isFile: false });
	});

	test("Given a path that does not exist, when checked, then throws an error", async () => {
		const spy = vi.spyOn({ lstat }, "lstat");
		spy.mockImplementation(() =>
			Promise.reject(new Error("ENOENT, no such file or directory"))
		);
		const filePath = voaNormalize("path/to/non/existent");

		try {
			await voaIsFileOrDir(filePath);
		} catch (error: any) {
			expect(error).toBeTruthy();
			expect(error?.message).toBe(
				`ENOENT: no such file or directory, lstat '${voaNormalize(path.resolve(filePath))}'`
			);
		}
	});
});
