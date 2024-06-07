export async function voaFilterAsync<T>(
	array: T[],
	predicate: (value: T, index: number, array: T[]) => Promise<boolean>
): Promise<T[]> {
	const results = await Promise.all(array.map(predicate));
	return array.filter((_value, index) => results[index]);
}
