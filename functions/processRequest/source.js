exports = async function(props, requiredProps, uniqueCode) {
	var result;
	// Combine passed required properties with the defaults:
	requiredProps = ['secret', 'sessionID'].concat(requiredProps);

	try {
		props = context.functions.execute("getPropertiesPreppedForQuerying",
			props, requiredProps
		);
		if (props.error) return JSON.stringify(props);

		result = await uniqueCode(props);

	} catch (e) {
		result = {error: {message: e.message}};
	}

	return JSON.stringify(result);
};
