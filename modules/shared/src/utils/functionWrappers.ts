export const handle = async (promise: Promise<any>) => {
	try {
		return { value: await promise };
	} catch (err: any) {
		return { error: err };
	}
};
