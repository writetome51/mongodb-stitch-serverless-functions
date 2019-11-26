exports = async function(email) {
	var users = context.functions.execute("getUsersCollection");
	var user = await users.findOne({email});

	if (!(user)) throw new Error("User does not exist");

	return user;
};
