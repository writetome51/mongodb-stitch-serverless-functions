exports = async (email) => {
	try {
		var user = context.functions.execute("getUserByEmail", email);
	} catch (e) {
		return {success: false};
	}
	return {success: true};
};
