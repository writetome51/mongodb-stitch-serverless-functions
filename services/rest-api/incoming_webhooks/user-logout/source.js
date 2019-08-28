exports = async function(payload) {
	var user = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password']
	);
	if (user.error) return JSON.stringify(user);

	var users = context.functions.execute("getUsersCollection");

	try {
		var result = await users.updateOne(
			{email: user.email, password: user.password, loggedIn: true},
			{$set: {loggedIn: false}}
		);
	} catch (e) {
		return {error: e};
	}

	result = context.functions.execute("getMessageFromResult", result, 'update');
	return JSON.stringify(result);
};
