export interface ICacheItem<T = unknown> {
	current: T;
	resolver: () => Promise<T>;
	expires: Date;
	ttl: number;
}

export interface ICache {
	registerKey: <T = unknown>(
		key: PropertyKey,
		resolver: ICacheItem["resolver"],
		timeToLiveSecs?: number
	) => Promise<void>;

	get: <T = unknown>(key: PropertyKey) => Promise<T>;
	has: (key: PropertyKey) => boolean;
}
