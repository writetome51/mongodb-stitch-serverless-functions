exports = async function(email, password, libraryName) {

	var user = await context.functions.execute("getUser", email, password);
	if (user.error) return user;

	delete user.libraries[libraryName];

	var result = await context.functions.execute(
		"updateProperty", user, "libraries", user.libraries
	);
	return context.functions.execute("getMessageFromResult", result, 'update');
};
