exports = async function(email) {
	const {exec} = require("realm-function-exec");

	var user = await exec("getUser", {email});
	if (!(user)) throw new Error("User does not exist");

	return user;
};
