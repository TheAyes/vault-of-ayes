import { Cache } from "./utils/cacheUtils.js";
import { voaFindProjectRoot } from "./utils/pathUtils.js";

export const cache: Cache = new Cache();

export const initializeCache = async () => {
	await cache.initCacheEntry("projectRoot", () => voaFindProjectRoot(), 1800);
};
