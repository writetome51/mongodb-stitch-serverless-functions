exports = async function({sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			return await exec("updateUserAlreadyLoggedIn",
				sessionID, {}, {$set: {'loggedIn': false}}
			);
		}
	);
};
