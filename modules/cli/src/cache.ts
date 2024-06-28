import { Cache } from "./utils/cacheUtils";
import { voaFindProjectRoot } from "./utils/filesystemUtils";

export const cache: Cache = new Cache();

export const initializeCache = async () => {
	await cache.initCacheEntry("projectRoot", () => voaFindProjectRoot(), 1800);
};
