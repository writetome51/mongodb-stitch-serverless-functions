exports = async function(payload) {
	var props = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password', 'newPassword']
	);
	if (props.error) return JSON.stringify(props);

	props = context.functions.execute("getPropertiesAfterComparingOldAndNewPasswords", props);
	if (props.error) return JSON.stringify(props);

	var result = await context.functions.execute("updatePassword", props);
	result = context.functions.execute("getMessageFromResult", result, 'update');

	if (result.success) result = await context.functions.execute("getUser", props.email, props.newPassword);
	return JSON.stringify(result);
};
