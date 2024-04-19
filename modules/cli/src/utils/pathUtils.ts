import path from "path";
import { voaLog } from "./loggingUtils.js";

export const voaNormalize = (pathUrl: string) => {
	voaLog(`Normalizing path: ${pathUrl}`, { logLevel: "debug" });

	const result = path.normalize(pathUrl);
	voaLog(`Normalized path to: ${result}`, { logLevel: "debug" });

	return result.replaceAll("\\", "/");
};

export const voaJoin = (...paths: string[]) => {
	voaLog(`Joining paths: ${paths}`, { logLevel: "debug" });

	const result = path.join(...paths);
	voaLog(`Paths joined: ${result}`, { logLevel: "debug" });

	return result.replaceAll("\\", "/");
};
