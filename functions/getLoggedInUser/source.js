exports = async function({sessionID}) {
	const {exec} = require("realm-function-exec");

	var user = await exec("getUser", {sessionID})
	// If user wasn't found the sessionID was invalid, meaning user's not logged in.
	if (!(user) || !(user.loggedIn)) throw new Error("You're not logged in. Log in first");

	return user;
};
