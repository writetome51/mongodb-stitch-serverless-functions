exports = async (email) => {
	try {
		var user = await context.functions.execute("getUserByEmail", email);
	} catch (e) {
		return {success: false};
	}
	return {success: true};
};
