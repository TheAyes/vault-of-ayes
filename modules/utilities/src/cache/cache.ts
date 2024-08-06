import { TYPES } from "@vault-of-ayes/shared";
import { inject, injectable } from "tsyringe";
import type { IConsole } from "../console";
import type { ICache, ICacheItem } from "./cache.interface.ts";

@injectable()
class CacheItem implements ICacheItem {
	public constructor(
		public current: ICacheItem["current"],
		public resolver: ICacheItem["resolver"],
		public expires: ICacheItem["expires"],
		public ttl: ICacheItem["ttl"]
	) {}

	public isExpired = (): boolean => {
		return this.expires.getTime() <= new Date().getTime();
	};

	public refresh = async (): Promise<void> => {
		this.current = await this.resolver();
		this.expires = Cache.generateExpiry(this.ttl);
	};
}

@injectable()
export class Cache implements ICache {
	private store = new Map<PropertyKey, ICacheItem>();

	constructor(@inject(TYPES.Console) private console: IConsole) {}

	static generateExpiry = (ttl: number) => {
		const expires = new Date();
		expires.setSeconds(expires.getSeconds() + ttl);
		return expires;
	};

	public get: ICache["get"] = async <T = unknown>(
		key: PropertyKey,
		resolver?: () => Promise<T>,
		ttl: number = 60
	): Promise<T> => {
		if (!this.has(key)) {
			if (!resolver)
				throw new Error(
					"It has been tried to access an uninitialized key, yet there was no resolver function specified."
				);
			await this.registerKey<T>(key, resolver, ttl);
		}

		let storeItem = this.store.get(key)!;
		let current = storeItem.current;

		if (storeItem.expires <= new Date() || current === undefined) {
			const expiry = Cache.generateExpiry(storeItem.ttl);
			current = await storeItem.resolver();

			storeItem = {
				...storeItem,
				current,
				expires: expiry
			};
			this.store.set(key, storeItem);
			this.console.log(
				`New cache store item created. Expires: ${expiry}`
			);
		}

		return current as T;
	};

	public has: ICache["has"] = (key) => this.store.has(key);

	public clear = () => this.store.clear();

	public delete = (key: PropertyKey) => this.store.delete(key);

	public isExpired = (key: PropertyKey) => {
		this.throwIfNotExist(key);
		const storeItem = this.store.get(key)!;

		return storeItem.expires.getTime() <= new Date().getTime();
	};

	public list = () => {
		const result: { [K in PropertyKey]: any } = {};
		this.store.forEach((value, key) => {
			result[key] = value;
		});
		return result;
	};

	private registerKey = async <T = unknown>(
		key: PropertyKey,
		resolver: () => Promise<T>,
		timeToLiveSecs = 60
	) => {
		if (this.has(key)) return;

		this.store.set(key, {
			current: await resolver(),
			resolver: resolver,
			expires: Cache.generateExpiry(timeToLiveSecs),
			ttl: timeToLiveSecs
		});
	};

	private throwIfNotExist = (key: PropertyKey) => {
		if (!this.has(key)) {
			throw new Error(
				`Access to undefined store entry: ${String(key)}\nDid you forget to initialize this key?`
			);
		}
	};
}
