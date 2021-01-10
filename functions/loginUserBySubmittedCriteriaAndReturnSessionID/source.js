exports = async function(searchCriteria, errorMessageIfUserNotFound) {
	const {exec} = require("realm-function-exec");

	var users = exec("getUsersCollection");
	var sessionID = BSON.ObjectId().toString();

	var result = await users.updateOne(
		searchCriteria,
		{
			$currentDate: {lastLoggedIn: true}, // sets 'lastLoggedIn' to current date-time.
			$set: {loggedIn: true, sessionID}
		}
	);
	try {
		result = exec("getMessageFromUpdateOrDeleteResult", result, 'update');
	} catch (e) {
		throw new Error(e.message);
	}
	if (result.success) return sessionID;
	else throw new Error(errorMessageIfUserNotFound);
};
