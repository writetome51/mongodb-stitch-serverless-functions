exports = async function({sessionID}) {
	var users = context.functions.execute("getUsersCollection");
	var user = await users.findOne({sessionID});

	// If user wasn't found the sessionID was invalid, meaning user's not logged in.
	if (!(user) || !(user.loggedIn)) throw new Error("You're not logged in. Log in first");
	return user;
};
