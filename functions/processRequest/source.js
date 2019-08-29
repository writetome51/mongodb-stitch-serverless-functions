exports = async function(props, requiredProps, query) {
	var result;
	try{
		props = context.functions.execute("getPropertiesPreppedForQuerying",
			props, requiredProps
		);
		var users = context.functions.execute("getUsersCollection");
		result = await query(users, props);
	}
	catch (e) {
		result = {error: e};
	}
	return JSON.stringify(result);
};
