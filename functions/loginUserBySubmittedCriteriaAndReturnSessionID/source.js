exports = async function(searchCriteria, errorMessageIfUserNotFound) {
	const {exec} = require("realm-function-exec");

	var sessionID = BSON.ObjectId().toString();

	try {
		await exec("updateDocument",
			"image-library-app-user",
			searchCriteria,
			{
				$currentDate: {lastLoggedIn: true}, // sets 'lastLoggedIn' to current date-time.
				$set: {loggedIn: true, sessionID}
			}
		);
	}
	catch (e) {
		throw new Error(errorMessageIfUserNotFound);
	}
	return sessionID;
};
