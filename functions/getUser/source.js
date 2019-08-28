exports = async function(email, password) {
	var users = context.functions.execute("getUsersCollection");

	try {
		var doc = await users.findOne({email});
		if (!(doc)) return {error: {message: "No such user found"}};
		if (!(doc.loggedIn)) return {error: {message: "You're not logged in. Log in first"}};
		if (doc.password !== password) return {error: {message: "Incorrect password"}};

	} catch (e) {
		return {error: e};
	}

	return doc;
};
