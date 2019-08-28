// The submitted 'newValue' must be an object.
// It can contain as many key:value pairs to update as you want.

exports = async function(payload) {
	var user = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password', 'newValue']
	);
	if (user.error) return JSON.stringify(user);

	if (user.newValue.hasOwnProperty('password')) return JSON.stringify(
		{error: {message: "You cannot change the password using this webhook"}}
	);

	try {
		var result = await users.updateOne(
			{email: user.email, password: user.password, loggedIn: true},
			{$set: user.newValue}
		);
	} catch (e) {
		return {error: e};
	}
	result = context.functions.execute("getMessageFromResult", result, 'update');
	if (result.success) result = await context.functions.execute("getUser",
		user.newValue.email, user.newValue.password
	);

	return JSON.stringify(result);
};
