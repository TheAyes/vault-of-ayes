import { handle } from "@vault-of-ayes/shared/src/utils/functionWrappers";
import { vol } from "memfs";
import * as fsPromises from "node:fs/promises";
import * as path from "node:path";
import * as util from "node:util";

const PACKAGE_JSON = "package.json";

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

type TFile = {
	name: string;
	isDirectory: false;
	content: string;
};

type TDirectory = {
	name: string;
	isDirectory: true;
	children: (TDirectory | TFile)[];
};

type TaddProjectParams = {
	projectName: string;
	projectPath?: string;
	isSubtree?: boolean;
};

const addProject = async ({ projectName, projectPath = "./modules" }: TaddProjectParams) => {
	const { error: findPkgError, value: packageJsonPath } = await handle(findNearestPackageJson());
	const rootPath = path.dirname(packageJsonPath);
	if (findPkgError) {
		console.error(findPkgError);
		return;
	}
	console.log(`Found packageJson at: ${rootPath}`);

	const templatePath = path.join(rootPath, "templates/project");
	const { error: accessError } = await handle(fsPromises.access(templatePath));
	if (accessError) {
		console.error(accessError);
		return;
	}

	const readDir = async (currentPath: string): Promise<TDirectory> => {
		console.log(`Reading: ${currentPath}`);

		const children: (TDirectory | TFile)[] = [];
		const dirContents = await fsPromises.readdir(currentPath);

		for (const content of dirContents) {
			const contentPath = path.join(currentPath, content);
			const stats = await fsPromises.stat(contentPath);

			if (stats.isDirectory()) {
				children.push(await readDir(contentPath));
			} else if (stats.isFile()) {
				const fileName = content.replaceAll(".template", "");

				const fileContent = (await Bun.file(contentPath).text())
					.replaceAll("$projectName$", projectName)
					.replaceAll("$projectPath$", projectPath);

				children.push({
					name: fileName,
					isDirectory: false,
					content: fileContent,
				});
			}
		}

		const name = path
			.basename(currentPath)
			.replace("__projectName__", projectName)
			.replace("__projectPath__", projectPath);

		return {
			name: name,
			isDirectory: true,
			children: children,
		};
	};

	const fileStructure = await readDir(templatePath);

	console.log(
		util.inspect(fileStructure, {
			depth: null,
			colors: true,
		}),
	);

	process.chdir("C:/");
	vol.fromJSON({});

	const buildFileStructure = async (currentFileNode: TDirectory, currentPath: string = "") => {
		// Loop through the children of the current node, to avoid creating the root directory itself
		for (const fileNode of currentFileNode.children) {
			if (fileNode.isDirectory) {
				const dirPath = path.join(currentPath, fileNode.name);

				await vol.promises.mkdir(dirPath, { recursive: true });
				await buildFileStructure(fileNode, dirPath);
			} else {
				const filePath = path.join(currentPath, fileNode.name);

				await vol.promises.writeFile(filePath, fileNode.content, { encoding: "utf-8" });
			}
		}
	};

	await buildFileStructure(fileStructure);

	// Function to dump the in-memory structure to disk
	const dumpToDisk = async (diskPath: string = process.cwd(), currentPath: string = ".") => {
		console.log(`Processing path: ${currentPath}`);

		// Recursively create directories and files from memfs to disk
		const items = (await vol.promises.readdir(currentPath)) as string[];
		for (const item of items) {
			const itemName = item.toString();
			const itemPath = path.join(currentPath, itemName);
			const diskItemPath = path.join(diskPath, itemPath);

			console.log(itemName);

			const stat = await vol.promises.stat(itemPath);

			if (stat.isDirectory()) {
				await fsPromises.mkdir(diskItemPath, { recursive: true });
				await dumpToDisk(diskPath, itemPath); // Correct recursive call
			} else if (stat.isFile()) {
				const fileContent = (await vol.promises.readFile(itemPath, { encoding: "utf-8" })) as string;
				await fsPromises.writeFile(diskItemPath, fileContent);
			}
		}
	};

	await dumpToDisk("C:\\Projekte\\vault-of-ayes\\modules", ".");

	return vol.toJSON();
};
await addProject({ projectName: "helloWorld", projectPath: ".", isSubtree: false });
