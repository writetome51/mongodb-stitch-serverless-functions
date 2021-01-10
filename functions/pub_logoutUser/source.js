exports = async function({sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			return await exec("updateUser",
				sessionID, {}, {$set: {'loggedIn': false}}
			);
		}
	);
};
