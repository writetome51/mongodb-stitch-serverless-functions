// The submitted 'newValue' must be an object.
// It can contain as many key:value pairs to update as you want.

exports = async function(payload) {
	var user = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['newEmail']
	);
	if (user.error) return JSON.stringify(user);

	var users = context.functions.execute("getUsersCollection");

	try {
		var result = await users.updateOne(
			{email: user.email, password: user.password, loggedIn: true},
			{$set: {email: user.newEmail}}
		);
	} catch (e) {
		return {error: e};
	}
	result = context.functions.execute("getMessageFromResult", result, 'update');
	if (result.success) result = await context.functions.execute("getUser",
		user.newEmail, user.password
	);

	return JSON.stringify(result);
};
