exports = async function(payload, response) {

	var properties = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password']
	);
	if (properties.error) return JSON.stringify(properties);

	const result = await context.functions.execute("getUser", properties.email, properties.password);
	return JSON.stringify(result);
};
