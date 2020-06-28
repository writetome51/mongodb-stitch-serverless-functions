exports = async function(props, requiredProps, uniqueCode) {
	var result;

	var defaultRequiredProps = ['secret', 'sessionID'];
	requiredProps = defaultRequiredProps.concat(requiredProps);

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
