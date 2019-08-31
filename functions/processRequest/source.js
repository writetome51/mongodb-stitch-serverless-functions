exports = async function(props, requiredProps, query) {
	var result;
	// Combine passed required properties with the defaults:
	requiredProps = ['secret', 'email', 'password'].concat(requiredProps);

	try {
		props = context.functions.execute("getPropertiesPreppedForQuerying",
			props, requiredProps
		);
		result = await query(props);
	}
	catch (e) {
		result = {error: e};
	}
	return JSON.stringify(result);
};
