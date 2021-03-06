exports = async function({name, sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			var user = await exec("getLoggedInUser", {sessionID});
			return await exec("getLibrary", {_user_id: user._id, name});
		}
	);

};
