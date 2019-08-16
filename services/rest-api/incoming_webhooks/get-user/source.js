exports = async function(payload, response) {
	var properties = context.functions.execute(
		"getValidatedRequestProperties_or_Error", payload, ['secret', 'email', 'password']
	);
	if (properties.error) return JSON.stringify(properties);

	const email = properties.email;
	const password = context.functions.execute("getHashString", properties.password);

	const result = await context.functions.execute("getUser", email, password);
	return JSON.stringify(result);
};
