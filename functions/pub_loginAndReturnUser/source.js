exports = async function({email, password}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			password = exec("getHash", password);
			let sessionID = await exec("loginUserAndReturnSessionID", email, password);
			return await exec("getLoggedInUser", {sessionID});
		}
	);
};
