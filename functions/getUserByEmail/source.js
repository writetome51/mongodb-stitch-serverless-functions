exports = async function(email) {
	var user = await context.functions.execute("getUser", {email});
	if (!(user)) throw new Error("User does not exist");

	return user;
};
