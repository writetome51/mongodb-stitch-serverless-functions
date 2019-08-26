exports = async function(payload) {
	var props = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password', 'propToUpdate', 'newValue']
	);
	if (props.error) return JSON.stringify(props);

	// Remember, 'propToUpdate' can contain dot-notation.
	var result = await context.functions.execute(
		"updateProperty", props, props.propToUpdate, props.newValue
	);
	result = context.functions.execute("getMessageFromResult", result, 'update');
	return JSON.stringify(result);
};
