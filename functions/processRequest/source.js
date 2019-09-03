exports = async function(props, requiredProps, uniqueCode) {
	var result;
	// Combine passed required properties with the defaults:
	requiredProps = ['secret', 'email', 'password'].concat(requiredProps);

	try {
		props = context.functions.execute("getPropertiesPreppedForQuerying",
			props, requiredProps
		);
		result = await uniqueCode(props);

	} catch (e) {
		result = {error: {message: e.message}};
	}

	return JSON.stringify(result);
};
