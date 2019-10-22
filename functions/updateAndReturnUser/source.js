exports = async function(user, uniqueSearchCriteria, updatingObject) {
	try{
		var result = await context.functions.execute("updateUser",
			user, uniqueSearchCriteria, updatingObject
		);
	}
	catch (e) {
		throw new Error(e.message);
	}

	if (result.success) {
		result = await context.functions.execute("getUser", user.sessionID);
	}
	return result;
};
