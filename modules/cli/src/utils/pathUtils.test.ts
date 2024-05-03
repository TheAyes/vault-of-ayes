import {describe, expect, test, afterEach, vi} from "vitest";
import { VoaPathLike } from "../types.js";
import {voaIsFileOrDir, voaJoin, voaNormalize, voaExists, voaDirname} from "./pathUtils.js";
import {vol} from "memfs";

const isWindows = process.platform === "win32";

vi.mock("node:fs/promises", async () => {
	const memfs: { fs: typeof fs } = await vi.importActual("memfs");

	return memfs.fs.promises;
});

afterEach(() => {
	vol.reset();
	vi.restoreAllMocks();
});

describe("`voaNormalize` function tests", () => {
	test("Given a relative path without additional slashes, when the path is normalized, then the output is the same path", () => {
		expect(voaNormalize("path/to/project")).toBe(
			isWindows ? "path\\to\\project" : "path/to/project"
		);
	});

	test("Given a relative path with additional slashes, when the path is normalized, then slashes are condensed to single slashes", () => {
		expect(voaNormalize("path//to//project")).toBe(
			isWindows ? "path\\to\\project" : "path/to/project"
		);
	});

	test("Given a path prefaced with './', when the path is normalized, then './' is removed from the start", () => {
		expect(voaNormalize("./path/to/project")).toBe(
			isWindows ? "path\\to\\project" : "path/to/project"
		);
	});

	test("Given an absolute Windows path using forward slashes, when the path is normalized, then the output is identical to the input", () => {
		expect(voaNormalize("C:/path/to/project/absolute")).toBe(
			isWindows
				? "C:\\path\\to\\project\\absolute"
				: "/path/to/project/absolute"
		);
	});

	test("Given an absolute Unix path, when the path is normalized, then the output is identical to the input", () => {
		expect(voaNormalize("/path/to/project")).toBe(
			isWindows ? "C:\\path\\to\\project" : "/path/to/project"
		);
	});

	test("Given a Windows path using backslashes, when the path is normalized, then forward slashes replace the backslashes", () => {
		expect(voaNormalize("C:\\path\\to\\project")).toBe(
			isWindows ? "C:\\path\\to\\project" : "/path/to/project"
		);
	});

	test("Given an absolute path with a reference to parent directory, when the path is normalized, then the parent directory reference is resolved", () => {
		expect(voaNormalize("/path/to/../project")).toBe(
			isWindows ? "C:\\path\\project" : "/path/project"
		);
	});

	test("Given a Windows path with a reference to parent directory, when the path is normalized, then the parent directory reference is resolved", () => {
		expect(voaNormalize("C:/path/to/../project")).toBe(
			isWindows ? "C:\\path\\project" : "/path/project"
		);
	});

	test("Given a path that points to current directory '.', when the path is normalized, then the output is '.'", () => {
		expect(voaNormalize(".")).toBe(".");
	});

	test("Given an empty path, when the path is normalized, then the path to the current directory '.' is returned", () => {
		expect(voaNormalize("")).toBe(".");
	});
});

describe("`voaJoin` function tests", () => {
	test("Given two relative paths, when the paths are joined, then they are combined into a single path", () => {
		expect(voaJoin("path\\to", "project")).toBe(
			isWindows ? "path\\to\\project" : "path/to/project"
		);
	});

	test("Given a relative path and a filename, when the paths are joined, then they are combined into a single path", () => {
		expect(voaJoin("path/to/project", "file.txt")).toBe(
			isWindows
				? "path\\to\\project\\file.txt"
				: "path/to/project/file.txt"
		);
	});

	test("Given three relative paths, when joined, then a single path is returned combining them all", () => {
		expect(voaJoin("path1", "path2", "path3")).toBe(
			isWindows ? "path1\\path2\\path3" : "path1/path2/path3"
		);
	});

	test("Given a Windows-style path and another path, when joined, then a forward-slashed path is returned", () => {
		expect(voaJoin("C:\\path1", "path2")).toBe(
			isWindows ? "C:\\path1\\path2" : "/path1/path"
		);
	});

	test("Given paths where one contains a reference to parent directory (..), when joined, then a path without the parent directory reference is returned", () => {
		expect(voaJoin("path1", "..", "path2")).toBe("path2");
	});

	test("Given absolute paths, when joined, then a single forward-slashed path is returned", () => {
		expect(voaJoin("/path1", "path2")).toBe(
			isWindows ? "C:\\path1\\path2" : "/path1/path2"
		);
	});

	test("Given paths where the second path is an absolute path, when joined, then a single path is returned with both", () => {
		expect(voaJoin("/path1", "/path2")).toBe(
			isWindows ? "C:\\path1\\path2" : "/path1/path2"
		);
	});

	test("Given paths with special characters, when joined, then a single path containing all special characters is returned", () => {
		expect(voaJoin("path/with#hash", "path2")).toBe(
			isWindows ? "path\\with#hash\\path2" : "path/with#hash/path2"
		);
	});

	test("Given paths where the first path is empty, when joined, then the second path is returned", () => {
		expect(voaJoin("", "path2")).toBe("path2");
	});

	test("Given paths where the second path is empty, when joined, then the first path is returned", () => {
		expect(voaJoin("path1", "")).toBe("path1");
	});

	test("Given paths where one contains a trailing slash, when joined, then a single path is returned without trailing slashes", () => {
		expect(voaJoin("path1/", "path2")).toBe(
			isWindows ? "path1\\path2" : "path1/path2"
		);
	});

	test("Given paths where one starts with a leading slash, when joined, then a single path is returned with leading slash only at start", () => {
		expect(voaJoin("/path1", "path2/")).toBe(
			isWindows ? "C:\\path1\\path2\\" : "/path1/path2/"
		);
	});
});

describe("`voaIsFileOrDir` function tests", () => {
	test("Given a file path, when checked, then returns that it is a file not a directory", async () => {
		const filePath = "./modules/cli/package.json";
		const content = "Test content";
		vol.fromJSON({[filePath]: content});

		expect(
			(async () => await voaIsFileOrDir(filePath))()
		).resolves.toStrictEqual({isDir: false, isFile: true});
	});

	test("Given a directory path, when checked, then returns that it is a directory not a file", async () => {
		const filePath = "./modules/cli/src";
		const content = "Test content";
		vol.fromJSON({[filePath + "/test.txt"]: content});

		expect(
			(async () => await voaIsFileOrDir(filePath))()
		).resolves.toStrictEqual({isDir: true, isFile: false});
	});

	test("Given a path that does not exist, when checked, then throws an error", async () => {
		const filePath = "does/not/exist";
		vol.fromJSON({});

		expect(
			(async () => await voaIsFileOrDir(filePath))()
		).rejects.toThrowError();
	});
});

describe("`voaExists` function tests", () => {
	test("Given a valid file path, when voaExists is called, then it returns true", async () => {
		const pathUrl: VoaPathLike = isWindows ? "valid\\path\\file.txt" : "valid/path/file.txt";
		vol.fromJSON({[pathUrl]: "content"});

		await expect(
			(async () => await voaExists(pathUrl))()
		).resolves.toBe(true)
	});

	test("Given a non-existing file path, when voaExists is called, then it returns false", async () => {
		const pathUrl: VoaPathLike = isWindows ? "C:\\non\\existing\\path\\file.txt" : "/non/existing/path/file.txt";
		expect(await voaExists(pathUrl)).toBe(false);
	});

	test("Given a path of directory, when voaExists is called, then it returns true", async () => {
		const pathUrl: VoaPathLike = isWindows ? "C:\\valid\\path\\" : "/valid/path/";
		vol.fromJSON({[pathUrl]: "content"});

		expect(await voaExists(pathUrl)).toBe(true);
	});

	test("Given a non-existing directory path, when voaExists is called, then it returns false", async () => {
		const pathUrl: VoaPathLike = isWindows ? "C:\\non\\existing\\path\\" : "/non/existing/path/";
		expect(await voaExists(pathUrl)).toBe(false);
	});
});

describe("`voaDirname` function tests", () => {
	test("Given a valid file path, when voaDirname is called, then it returns the directory of the file", () => {
		const filePath: VoaPathLike = isWindows ? "C:\\path\\to\\file.txt" : "/path/to/file.txt";
		expect(voaDirname(filePath)).toBe(isWindows ? "C:\\path\\to" : "/path/to");
	});

	test("Given a valid directory path, when voaDirname is called, then it returns the parent directory of the input directory", () => {
		const dirPath: VoaPathLike = isWindows ? "C:\\path\\to\\directory\\" : "/path/to/directory/";
		expect(voaDirname(dirPath)).toBe(isWindows ? "C:\\path\\to" : "/path/to");
	});

	test("Given a root directory, when voaDirname is called, then it returns the root directory itself", () => {
		const rootDirPath: VoaPathLike = isWindows ? "C:\\" : "/";
		expect(voaDirname(rootDirPath)).toBe(rootDirPath);
	});

	test("Given an empty path, when voaDirname is called, then it returns '.' as the directory", () => {
		const emptyPath: VoaPathLike = "";
		expect(voaDirname(emptyPath)).toBe(".");
	});
});