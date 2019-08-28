exports = async function(email, password) {
	try {
		var user = await __getUser();
	} catch (e) {
		throw new Error(e.message);
	}
	return user;


	async function __getUser() {
		var users = context.functions.execute("getUsersCollection");
		var user = await users.findOne({email});

		if (!(user)) throw new Error("No such user found");
		if (!(user.loggedIn)) throw new Error("You're not logged in. Log in first");
		if (user.password !== password) throw new Error("Incorrect password");
		return user;
	}
};
