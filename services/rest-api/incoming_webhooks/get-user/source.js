exports = async function(payload, response) {

	var properties = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password']
	);
	if (properties.error) return JSON.stringify(properties);

	var result = await context.functions.execute("getUser", properties.email, properties.password);
	if (result === null) result = {error: {message: "No such user found"}};

	return JSON.stringify(result);
};
