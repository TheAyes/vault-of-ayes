export interface ICacheItem<T = unknown> {
	current: T;
	resolver: () => Promise<T>;
	expires: Date;
	ttl: number;
}

export interface ICache {
	get: <T = unknown>(
		key: PropertyKey,
		resolver?: () => Promise<T>,
		ttl?: number
	) => Promise<T>;
	has: (key: PropertyKey) => boolean;
}
