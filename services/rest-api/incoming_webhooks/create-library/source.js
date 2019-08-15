exports = async function(payload, response) {
	var properties = context.functions.execute(
		"getValidatedRequestBody_or_Error", payload, ['secret', 'email', 'password', 'library']
	);
	if (properties.error) return JSON.stringify(properties);

	if (!(properties.library.images)) properties.library.images = [];
	properties.password = context.functions.execute("getHashString", properties.password);

	var result = await context.functions.execute("createLibrary", properties);
	return JSON.stringify(result);
};
