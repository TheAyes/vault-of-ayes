import { describe, expect, test } from "vitest";
import { voaJoin, voaNormalize } from "./pathUtils.js";

describe("`voaNormalize` function tests", () => {
	test("Given a relative path without additional slashes, when the path is normalized, then the output is the same path", () => {
		expect(voaNormalize("path/to/project")).toBe("path/to/project");
	});

	test("Given a relative path with additional slashes, when the path is normalized, then slashes are condensed to single slashes", () => {
		expect(voaNormalize("path//to//project")).toBe("path/to/project");
	});

	test("Given a path prefaced with './', when the path is normalized, then './' is removed from the start", () => {
		expect(voaNormalize("./path/to/project")).toBe("path/to/project");
	});

	test("Given an absolute Windows path using forward slashes, when the path is normalized, then the output is identical to the input", () => {
		expect(voaNormalize("C:/path/to/project/absolute")).toBe(
			"C:/path/to/project/absolute"
		);
	});

	test("Given an absolute Unix path, when the path is normalized, then the output is identical to the input", () => {
		expect(voaNormalize("/path/to/project")).toBe("/path/to/project");
	});

	test("Given a Windows path using backslashes, when the path is normalized, then forward slashes replace the backslashes", () => {
		expect(voaNormalize("C:\\path\\to\\project")).toBe(
			"C:/path/to/project"
		);
	});

	test("Given an absolute path with a reference to parent directory, when the path is normalized, then the parent directory reference is resolved", () => {
		expect(voaNormalize("/path/to/../project")).toBe("/path/project");
	});

	test("Given a Windows path with a reference to parent directory, when the path is normalized, then the parent directory reference is resolved", () => {
		expect(voaNormalize("C:/path/to/../project")).toBe("C:/path/project");
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
		expect(voaJoin("path/to", "project")).toBe("path/to/project");
	});

	test("Given a relative path and a filename, when the paths are joined, then they are combined into a single path", () => {
		expect(voaJoin("path/to/project", "file.txt")).toBe(
			"path/to/project/file.txt"
		);
	});

	test("Given three relative paths, when joined, then a single path is returned combining them all", () => {
		expect(voaJoin("path1", "path2", "path3")).toBe("path1/path2/path3");
	});

	test("Given a Windows-style path and another path, when joined, then a forward-slashed path is returned", () => {
		expect(voaJoin("C:\\path1", "path2")).toBe("C:/path1/path2");
	});

	test("Given paths where one contains a reference to parent directory (..), when joined, then a path without the parent directory reference is returned", () => {
		expect(voaJoin("path1", "..", "path2")).toBe("path2");
	});

	test("Given absolute paths, when joined, then a single forward-slashed path is returned", () => {
		expect(voaJoin("/path1", "path2")).toBe("/path1/path2");
	});

	test("Given paths where the second path is an absolute path, when joined, then a single path is returned with both", () => {
		expect(voaJoin("/path1", "/path2")).toBe("/path1/path2");
	});

	test("Given paths with special characters, when joined, then a single path containing all special characters is returned", () => {
		expect(voaJoin("path/with#hash", "path2")).toBe("path/with#hash/path2");
	});

	test("Given paths where the first path is empty, when joined, then the second path is returned", () => {
		expect(voaJoin("", "path2")).toBe("path2");
	});

	test("Given paths where the second path is empty, when joined, then the first path is returned", () => {
		expect(voaJoin("path1", "")).toBe("path1");
	});

	test("Given paths where one contains a trailing slash, when joined, then a single path is returned without trailing slashes", () => {
		expect(voaJoin("path1/", "path2")).toBe("path1/path2");
	});

	test("Given paths where one starts with a leading slash, when joined, then a single path is returned with leading slash only at start", () => {
		expect(voaJoin("/path1", "path2/")).toBe("/path1/path2/");
	});
});
