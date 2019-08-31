exports = async function(payload) {
	try {
		var properties = context.functions.execute(
			"getPropertiesPreppedForQuerying", payload, []
		);
		var result = await context.functions.execute("getUser", properties.email, properties.password);
	}
	catch (e) {
		result = {error: e};
	}

	return JSON.stringify(result);
};
