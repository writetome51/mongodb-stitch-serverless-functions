exports = async function(payload) {

	var props = context.functions.execute(
		"getPropertiesPreppedForQuerying",
		payload, ['secret', 'email', 'password', 'libraryName', 'newValue']
	);
	if (props.error) return JSON.stringify(properties);

	var result = await context.functions.execute(
		"updateProperty", props, ('libraries.' + props.libraryName), props.newValue
	);
	result = context.functions.execute("getMessageFromResult", result, 'update');
	if (result.success) result = await context.functions.execute("getImageLibrary", props);

	return JSON.stringify(result);
};
