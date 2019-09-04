exports = async function(user, uniqueSearchCriteria, updatingObject) {
	var defaultSearchCriteria = {sessionID: user.sessionID, loggedIn: true};
	var searchCriteria = mergeObjects(defaultSearchCriteria, uniqueSearchCriteria);

	var users = context.functions.execute("getUsersCollection");
	var result = await users.updateOne(searchCriteria, updatingObject);

	try {
		result = context.functions.execute("getMessageFromResult", result, 'update');
	} catch (e) {
		throw new Error(e.message);
	}
	return result;


	function mergeObjects() {
		var res = {};
		for (var i = 0; i < arguments.length; i++) {
			for (var x in arguments[i]) {
				res[x] = arguments[i][x];
			}
		}
		return res;
	}

};
