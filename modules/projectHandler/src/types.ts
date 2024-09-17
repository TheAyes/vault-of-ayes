export type TFile = {
	name: string;
	isDirectory: false;
	content: string;
};

export type TDirectory = {
	name: string;
	isDirectory: true;
	children: (TDirectory | TFile)[];
};

export type TaddProjectParams = {
	projectName: string;
	projectPath?: string;
	subtree?: {
		enable: boolean;
		remoteUrl: string;
		pullBranches: string[];
		pushBranches: string[];
		cloneBranch: string;
		addRunConfigurations: boolean;
	};
};

export type TVoaData = {
	subProjects: {
		name: string;
		path: string;
		subtree?: {
			enabled: boolean;
			prefix: string;
			remoteUrl: string;
			hasRunConfigurations: boolean;
		};
	}[];
};
