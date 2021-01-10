exports = async function(sessionID, uniqueSearchCriteria, updatingObject) {
	const {exec} = require("realm-function-exec");

	await exec("updateUser",
		sessionID, uniqueSearchCriteria, updatingObject
	);
	return await exec("getLoggedInUser", {sessionID});
};
