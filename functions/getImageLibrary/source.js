exports = async function(properties) {
	var user = await context.functions.execute("getUser", properties.email, properties.password);
	if (user.error) return user;

	return user.libraries[properties.libraryName];
};
