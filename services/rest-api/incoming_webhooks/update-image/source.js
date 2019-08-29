exports = async function(payload) {

	var props = context.functions.execute("getPropertiesPreppedForQuerying",
		payload, ['secret', 'email', 'password', 'libraryName', 'imageIndex', 'newValue']
	);
	if (props.error) return JSON.stringify(props);

	props.imageIndex += ''; // must be a string.
	if (!(props.newValue.src)) return JSON.stringify(
		{error: {message: "The image must have a 'src' property"}}
	);

	var result = await context.functions.execute("updateProperty",
		props, (`libraries.${props.libraryName}.${props.imageIndex}`), props.newValue
	);

	result = context.functions.execute("getMessageFromResult", result, 'update');
	if (result.success) result = await context.functions.execute("getImage", props);

	return JSON.stringify(result);
};