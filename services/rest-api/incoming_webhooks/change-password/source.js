exports = async function(payload, response) {
	var properties = context.functions.execute(
		"getValidatedRequestProperties_or_Error", payload, ['secret', 'email', 'password', 'new_password']
	);
	if (properties.error) return JSON.stringify(properties);

	if (properties.password === properties.new_password) return JSON.stringify(
		{error: {message: "The current password and the new password cannot match."}}
	);

	properties.password = context.functions.execute("getHashString", properties.password);
	properties.new_password = context.functions.execute("getHashString", properties.new_password);

	var result = await context.functions.execute("changePassword", properties);
	return JSON.stringify(result);
};
