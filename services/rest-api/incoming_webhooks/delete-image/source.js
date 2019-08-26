exports = async function(payload) {

	var properties = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password', 'libraryName', 'imageIndex']
	);
	if (properties.error) return JSON.stringify(properties);

	var result = await context.functions.execute("deleteImage", properties);
	return JSON.stringify(result);
};
