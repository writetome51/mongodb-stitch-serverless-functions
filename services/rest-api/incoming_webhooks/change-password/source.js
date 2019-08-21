exports = async function(payload, response) {
	var properties = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password', 'newPassword']
	);
	if (properties.error) return JSON.stringify(properties);

	properties.newPassword = context.functions.execute("getHashString", properties.newPassword);

	if (properties.password === properties.newPassword) return JSON.stringify(
		{error: {message: "The current password and the new password cannot match."}}
	);

	var result = await context.functions.execute("changePassword", properties);
	return JSON.stringify(result);
};
