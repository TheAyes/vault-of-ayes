import { voaLog } from "./loggingUtils.js";

type StoreEntry<T = unknown> = {
	current: T;
	resolver: () => Promise<T>;
	expires: Date;
	ttl: number;
};

export class Cache {
	private store = new Map<PropertyKey, StoreEntry>();

	public initCacheEntry = async <T>(
		key: PropertyKey,
		resolver: StoreEntry<T>["resolver"],
		timeToLive = 60
	) => {
		if (this.has(key)) {
			throw new Error(
				`This store key has already been initialized. This is usually an accident.\n  wants to init: ${String(key)}\n  found: ${JSON.stringify(this.store.get(key), null, 4)}`
			);
		}

		this.store.set(key, {
			current: await resolver(),
			resolver,
			expires: this.generateExpiry(timeToLive),
			ttl: timeToLive
		});

		return;
	};

	public get = async <T extends unknown>(key: PropertyKey): Promise<T> => {
		this.throwIfNotExist(key);

		const storeItem = this.getStoreItem(key);
		let current = storeItem.current;

		if (storeItem.expires <= new Date() || current === null) {
			const expiry = this.generateExpiry(storeItem.ttl);
			current = await storeItem.resolver();

			this.store.set(key, {
				expires: expiry,
				resolver: storeItem.resolver,
				current,
				ttl: storeItem.ttl
			});
			voaLog(`Refreshed cached store entry. Expires: ${expiry}`);
		}

		return current as T;
	};

	public has = (key: PropertyKey) => this.store.has(key);

	public clear = () => this.store.clear();

	public delete = (key: PropertyKey) => this.store.delete(key);

	public isExpired = (key: PropertyKey) => {
		this.throwIfNotExist(key);
		const storeItem = this.getStoreItem(key);

		return storeItem.expires.getTime() <= new Date().getTime();
	};

	public list = () => {
		const keys = Array.from(this.store.keys());
		const values = Array.from(this.store.values());

		let result: { [K in PropertyKey]: any } = {};
		keys.forEach((currentKey, index) => {
			result[currentKey] = values[index];
		});

		return result;
	};

	private generateExpiry = (ttl: number) => {
		const expires = new Date();
		expires.setSeconds(expires.getSeconds() + ttl);
		return expires;
	};

	private throwIfNotExist = (key: PropertyKey) => {
		if (!this.has(key)) {
			throw new Error(
				`Access to undefined store entry: ${String(key)}\nDid you forget to initialize this key?`
			);
		}
	};

	private getStoreItem = (key: PropertyKey) => {
		this.throwIfNotExist(key);
		return this.store.get(key)!;
	};
}
