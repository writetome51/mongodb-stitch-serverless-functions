exports = async function(sessionID, uniqueSearchCriteria, updatingObject) {
	try{
		var result = await context.functions.execute("updateUser",
			sessionID, uniqueSearchCriteria, updatingObject
		);
	}
	catch (e) {
		throw new Error(e.message);
	}

	if (result.success) {
		result = await context.functions.execute("getUser", sessionID);
	}
	return result;
};
