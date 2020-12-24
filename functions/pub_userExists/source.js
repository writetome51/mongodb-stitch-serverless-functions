exports = async ({email}) => {
	try {
		var user = await context.functions.execute("getUserByEmail", email);
	} catch (error) {
		return {success: false};
	}
	return {success: true};
};
