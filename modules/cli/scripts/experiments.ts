import { cache, initializeCache } from "@vault-of-ayes/cli/src/cache";

await initializeCache();

console.log(cache.list());
