exports = async function(sessionID) {
	var users = context.functions.execute("getUsersCollection");
	var user = await users.findOne({sessionID});

	if (!(user)) throw new Error("Invalid sessionID");
	if (!(user.loggedIn)) throw new Error("You're not logged in. Log in first");
	return user;
};
