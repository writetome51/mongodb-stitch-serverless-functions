exports = async function(payload) {
	try {
		var properties = context.functions.execute(
			"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password']
		);
		var result = await context.functions.execute("getUser", properties.email, properties.password);
	}
	catch (e) {
		result = e;
	}

	return JSON.stringify(result);
};
