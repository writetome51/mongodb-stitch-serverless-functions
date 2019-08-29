exports = async function(props, requiredProps, query) {
	var result;
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
