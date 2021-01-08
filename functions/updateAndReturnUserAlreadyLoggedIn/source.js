exports = async function(sessionID, uniqueSearchCriteria, updatingObject) {
	try{
		var result = await context.functions.execute("updateUserAlreadyLoggedIn",
			sessionID, uniqueSearchCriteria, updatingObject
		);
	}
	catch (e) {
		throw new Error(e.message);
	}

	if (result.success) {
		result = await context.functions.execute("getLoggedInUser", {sessionID});
	}
	return result;
};
