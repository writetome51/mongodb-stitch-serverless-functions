exports = async function({sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => await exec("getLoggedInUser", {sessionID})
	);

};
