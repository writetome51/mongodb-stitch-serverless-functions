exports = async function(payload) {

	var properties = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password']
	);
	if (properties.error) return JSON.stringify(properties);

	var result = await context.functions.execute("getUser", properties.email, properties.password);

	return JSON.stringify(result);
};
