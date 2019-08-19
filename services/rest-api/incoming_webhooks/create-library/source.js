exports = async function(payload, response) {
	var properties = context.functions.execute(
		"getValidatedRequestProperties_or_Error", payload, ['secret', 'email', 'password', 'libraryName']
	);
	if (properties.error) return JSON.stringify(properties);

	properties.password = context.functions.execute("getHashString", properties.password);

	var result = await context.functions.execute("createLibrary", properties);
	return JSON.stringify(result);
};
