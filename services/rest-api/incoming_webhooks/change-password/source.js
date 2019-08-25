exports = async function(payload) {
	var properties = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password', 'newPassword']
	);
	if (properties.error) return JSON.stringify(properties);

	properties = context.functions.execute("getPropertiesAfterComparingOldAndNewPasswords", properties);
	if (properties.error) return JSON.stringify(properties);

	var result = await context.functions.execute("changePassword", properties);

	return JSON.stringify(result);
};
