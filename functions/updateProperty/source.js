// `property` can contain dot-notation.

exports = async function(user, property, newValue) {
	var users = context.functions.execute("getUsersCollection");
	var updatingObject = context.functions.execute(
		"getUpdatingObject", property, newValue
	);

	try {
		var result = await users.updateOne(
			{email: user.email, password: user.password, loggedIn: true},
			updatingObject
		);
	} catch (e) {
		throw new Error(e.message);
	}
	return result;
};