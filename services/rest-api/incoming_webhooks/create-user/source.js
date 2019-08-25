exports = async function(payload) {
	var properties = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password']
	);
	if (properties.error) return JSON.stringify(properties);

	properties['libraries'] = {};

	const result = await context.functions.execute("createUser", properties);
	return JSON.stringify(result);
};
