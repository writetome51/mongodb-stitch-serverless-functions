exports = async function(payload, response) {

	var properties = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password', 'libraryName', 'image']
	);
	if (properties.error) return JSON.stringify(properties);

	var result = await context.functions.execute("addImage", properties);
	return JSON.stringify(result);
};
