import { handle } from "@vault-of-ayes/shared/src/utils/functionWrappers";
import { vol } from "memfs";
import * as fsPromises from "node:fs/promises";
import * as path from "node:path";
import { simpleGit } from "simple-git";
import type { TaddProjectParams, TDirectory, TFile, TVoaData } from "./types";

const PACKAGE_JSON = "package.json";

const camelCaseString = (input: string): string => {
	return input
		.split(/[-_\s]/)
		.map((word, index) => {
			if (index === 0) {
				return word.toLowerCase();
			}
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		})
		.join("");
};

const pascalCaseString = (input: string): string => {
	return input
		.split(/[-_\s]/)
		.map((word) => {
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		})
		.join("");
};

const kebabCaseString = (input: string): string => {
	return input
		.split(/(?=[A-Z])|[\s-_]+/)
		.map((word) => {
			return word.toLowerCase();
		})
		.join("-");
};

const checkPackageJsonExists = async (dir: string): Promise<string | null> => {
	const packageJsonPath = path.join(dir, PACKAGE_JSON);
	try {
		await fsPromises.access(packageJsonPath);
		return packageJsonPath;
	} catch {
		return null;
	}
};

const findNearestPackageJson = async (startDir = process.cwd()): Promise<string | null> => {
	let currentDir = startDir;
	while (true) {
		const packageJsonPath = await checkPackageJsonExists(currentDir);
		if (packageJsonPath) {
			return packageJsonPath;
		}
		const parentDir = path.resolve(currentDir, "..");
		if (parentDir === currentDir) {
			throw new Error("No package.json file found in the directory hierarchy. Unable to determine root."); // No package.json found
		}
		currentDir = parentDir;
	}
};

export const addProject = async ({
	projectName,
	projectPath = "./modules",
	subtree = {
		enable: false,
		remoteUrl: "",
		addRunConfigurations: true,
		pullBranches: ["main"],
		pushBranches: ["main"],
		cloneBranch: "main"
	}
}: TaddProjectParams) => {
	const errorCleanupOperations: Function[] = [];

	const runErrorCleanup = async () => {
		await Promise.all(errorCleanupOperations);
	};

	const { error: findPkgError, value: packageJsonPath } = await handle(findNearestPackageJson());
	if (findPkgError || !packageJsonPath) {
		console.error(findPkgError);
		await runErrorCleanup();
		return;
	}
	const rootPath = path.dirname(packageJsonPath);

	const voaFile = Bun.file(path.join(rootPath, ".voa"));

	const templatePath = path.join(rootPath, "templates/project");
	const { error: accessError } = await handle(fsPromises.access(templatePath));
	if (accessError) {
		console.error(accessError);
		await runErrorCleanup();
		return;
	}

	const subtreePrefix = path.relative(rootPath, path.join(projectPath, projectName));

	if (subtree.enable && subtree.remoteUrl !== "") {
		const git = simpleGit();
		const { error: addRemoteError } = await handle(git.addRemote(subtreePrefix, subtree.remoteUrl));
		if (addRemoteError) {
			console.error(addRemoteError);
			await runErrorCleanup();
			return;
		}

		errorCleanupOperations.push(async () => await git.removeRemote(subtreePrefix));

		const { error: addSubtreeError } = await handle(
			git.raw([
				"subtree",
				"add",
				"--prefix",
				subtreePrefix,
				subtreePrefix,
				subtree.cloneBranch ?? subtree.pullBranches[0] ?? "main",
				"--squash"
			])
		);
		if (addSubtreeError) {
			console.error(addSubtreeError);
			await runErrorCleanup();
			return;
		}
	}

	const readDir = async (currentPath: string): Promise<TDirectory> => {
		console.log(`Reading: ${currentPath}`);

		const dirContents = await fsPromises.readdir(currentPath);

		const children = await Promise.all(
			dirContents.map(async (content) => {
				const contentPath = path.join(currentPath, content);
				const stats = await fsPromises.stat(contentPath);

				if (stats.isDirectory()) {
					return readDir(contentPath);
				} else if (stats.isFile()) {
					const fileName = content.replaceAll(".template", "");
					const fileContent = (await Bun.file(contentPath).text())
						.replaceAll("$projectName$", projectName)
						.replaceAll("$projectName_cC$", camelCaseString(projectName))
						.replaceAll("$projectName_kC$", kebabCaseString(projectName))
						.replaceAll("$projectName_pC$", pascalCaseString(projectName))
						.replaceAll("$projectPath$", projectPath);

					return {
						name: fileName,
						isDirectory: false,
						content: fileContent
					} as TFile;
				}

				return null;
			})
		);

		// Filter out any null values resulting from non-file and non-directory entries
		const filteredChildren = children.filter((child) => child !== null) as (TDirectory | TFile)[];

		const name = path
			.basename(currentPath)
			.replaceAll("__projectName__", projectName)
			.replaceAll("__projectName_cC__", camelCaseString(projectName))
			.replaceAll("__projectName_kC__", kebabCaseString(projectName))
			.replaceAll("__projectName_pC__", pascalCaseString(projectName))
			.replaceAll("__projectPath__", projectPath);

		return {
			name: name,
			isDirectory: true,
			children: filteredChildren
		};
	};

	const fileStructure = await readDir(templatePath);

	process.chdir("C:/");
	vol.fromJSON({});

	const buildFileStructure = async (currentFileNode: TDirectory, currentPath: string = "") => {
		// Loop through the children of the current node, to avoid creating the root directory itself
		await Promise.all(
			currentFileNode.children.map(async (fileNode) => {
				if (fileNode.isDirectory) {
					const dirPath = path.join(currentPath, fileNode.name);

					await vol.promises.mkdir(dirPath, { recursive: true });
					await buildFileStructure(fileNode, dirPath);
				} else {
					const filePath = path.join(currentPath, fileNode.name);

					await vol.promises.writeFile(filePath, fileNode.content, { encoding: "utf-8" });
				}
			})
		);
	};

	await buildFileStructure(fileStructure);

	// Function to dump the in-memory structure to disk
	const dumpToDisk = async (diskPath: string = process.cwd(), currentPath: string = ".") => {
		console.log(`Processing path: ${currentPath}`);

		// Recursively create directories and files from memfs to disk
		const items = (await vol.promises.readdir(currentPath)) as string[];
		await Promise.all(
			items.map(async (item) => {
				const itemName = item.toString();
				const itemPath = path.join(currentPath, itemName);
				const diskItemPath = path.join(diskPath, itemPath);

				console.log(itemName);

				const stat = await vol.promises.stat(itemPath);

				if (stat.isDirectory()) {
					await fsPromises.mkdir(diskItemPath, { recursive: true });
					await dumpToDisk(diskPath, itemPath); // Correct recursive call

					errorCleanupOperations.push(
						async () => await fsPromises.rm(diskItemPath, { recursive: true, force: true })
					);
				} else if (stat.isFile()) {
					const fileContent = (await vol.promises.readFile(itemPath, { encoding: "utf-8" })) as string;
					await fsPromises.writeFile(diskItemPath, fileContent);
				}
			})
		);
	};

	await dumpToDisk("C:\\Projekte\\vault-of-ayes\\modules", ".");

	let voaData: TVoaData = { subProjects: [] };
	if (await voaFile.exists()) {
		voaData = (await voaFile.json()) as TVoaData;
	}

	voaData.subProjects.push({
		name: projectName,
		path: projectPath,
		subtree: {
			enabled: subtree.enable,
			prefix: subtreePrefix,
			remoteUrl: subtree.remoteUrl,
			hasRunConfigurations: subtree.addRunConfigurations
		}
	});

	const { error: voaFileWriteError } = await handle(Bun.write(voaFile, JSON.stringify(voaData)));
	if (voaFileWriteError) {
		console.error(voaFileWriteError);
		await runErrorCleanup();
		return;
	}
};
