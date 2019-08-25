exports = async function(payload) {

	var properties = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password', 'libraryName', 'image']
	);
	if (properties.error) return JSON.stringify(properties);

	if (typeof properties.image === 'string') properties.image = JSON.parse(properties.image);
	var result = await context.functions.execute("addImage", properties);
	return JSON.stringify(result);
};
