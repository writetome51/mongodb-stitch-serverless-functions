exports = async function(payload) {
	var user = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password']
	);
	if (user.error) return JSON.stringify(user);

	var users = context.functions.execute("getUsersCollection");

	try {
		var result = await users.updateOne(
			{email: user.email, password: user.password},
			{
				$currentDate: {lastLoggedIn: true}, // sets 'lastLoggedIn' to current date-time.
				$set: {loggedIn: true}
			}
		);
	} catch (e) {
		return {error: e};
	}

	result = context.functions.execute("getMessageFromResult", result, 'update');
	if (result.success) result = await context.functions.execute("getUser", user.email, user.password);

	return JSON.stringify(result);
};
