import {type fs, vol} from "memfs";
import {afterEach, describe, expect, test, vi} from "vitest";


vi.mock("node:fs/promises", async () => {
	const memfs: { fs: typeof fs } = await vi.importActual("memfs");

	return memfs.fs.promises;
});

afterEach(() => {
	vol.reset();
	vi.restoreAllMocks();
});

describe("`voaWriteFile` function tests", () => {
	test("Given file path and content, when voaWriteFile is invoked, then it creates a file", async () => {
		const file: VoaPathLike = "file.txt";
		const content: string = "Test content";

		await voaWriteFile(file, content);


		expect(
			(async () => await vol.promises.access(file))()
		).resolves;

		await expect(
			(async () => await vol.promises.readFile(file, "utf-8"))()
		).resolves.toBe(content);
	});

	test("Given file path, content and options, when not dry run, then writeFile runs with provided parameters", async () => {
		const file: VoaPathLike = "path/to/file.txt";
		const content: string = "Test content";
		const options: VoaWriteFileOptions = {
			dry: false
		};

		await voaWriteFile(file, content, options);

		expect(
			(async () => await vol.promises.access(file))()
		).resolves;

		await expect(
			(async () => await vol.promises.readFile(file, "utf-8"))()
		).resolves.toBe(content);
	});

	test("Given file path, content and options, when dry run, then writeFile does not run", async () => {
		const file: VoaPathLike = "path/to/file.txt";
		const content = "Test content";
		const options: VoaWriteFileOptions = {
			dry: true
		};

		await voaWriteFile(file, content, options);

		await expect(
			(async () => await vol.promises.access(file))()
		).rejects.toThrowError();

		await expect(
			(async () => await vol.promises.readFile(file, "utf-8"))()
		).rejects.toThrowError();
	});
});

describe("`voaReadFile` function tests", () => {
	test("Given a file path and no options, when invoked, then readFile returns the content of the file", async () => {
		const file: VoaPathLike = "path/to/file.txt";
		const content: string = "Test content";

		vol.fromJSON({[file]: content});

		await expect(
			(async () => await voaReadFile(file))()
		).resolves.toBe(content);
	});

	test("Given a file path that does not exist, when invoked, it throws an error", async () => {
		const file: VoaPathLike = "path/to/non-existent-file.txt";

		await expect(
			voaReadFile(file)
		).rejects.toThrowError();
	});
});


