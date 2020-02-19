exports = async function(searchCriteria, errorMessageIfUserNotFound) {
	var users = context.functions.execute("getUsersCollection");
	var sessionID = BSON.ObjectId().toString();

	var result = await users.updateOne(
		searchCriteria,
		{
			$currentDate: {lastLoggedIn: true}, // sets 'lastLoggedIn' to current date-time.
			$set: {loggedIn: true, sessionID}
		}
	);
	try {
		result = context.functions.execute("getMessageFromCRUDResult", result, 'update');
	} catch (e) {
		throw new Error(e.message);
	}
	if (result.success) return sessionID;
	else throw new Error(errorMessageIfUserNotFound);
};
