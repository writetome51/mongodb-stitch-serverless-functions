exports = async function(payload) {

	var props = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password', 'libraryName', 'library']
	);
	if (props.error) return JSON.stringify(properties);

	var result = await context.functions.execute(
		"updateProperty", props, ('libraries.' + props.libraryName), props.library
	);
	return JSON.stringify(result);
};
