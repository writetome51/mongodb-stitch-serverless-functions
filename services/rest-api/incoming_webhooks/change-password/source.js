exports = async function(payload, response) {
	var properties = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password', 'newPassword']
	);
	if (properties.error) return JSON.stringify(properties);

	properties = context.functions.execute("getPropertiesAfterComparingOldAndNewPasswords", properties);
	if (properties.error) return JSON.stringify(properties);

	var result = await context.functions.execute("changePassword", properties);

	// Most likely the only db error will be that the requested user to modify was not found:
	if ((result.error.matchedCount !== undefined) && result.error.matchedCount === 0) {
		return JSON.stringify({error: {message: "The requested user was not found"}});
	}
	return JSON.stringify(result);
};
