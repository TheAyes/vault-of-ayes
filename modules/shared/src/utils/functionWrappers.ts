export const handle = async <T>(promise: Promise<T>) => {
	try {
		return { value: await promise };
	} catch (err: any) {
		return { error: err };
	}
};
