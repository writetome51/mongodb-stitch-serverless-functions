exports = async function(payload) {

	var props = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password', 'libraries']
	);
	if (props.error) return JSON.stringify(props);

	var result = await context.functions.execute(
		"updateProperty", props, 'libraries', props.libraries
	);
	result = context.functions.execute("getMessageFromResult", result, 'update');
	return JSON.stringify(result);
};
