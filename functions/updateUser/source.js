exports = async function(sessionID, uniqueSearchCriteria, updatingObject) {
	var defaultSearchCriteria = {'sessionID': sessionID, 'loggedIn': true};
	var searchCriteria = mergeObjects(defaultSearchCriteria, uniqueSearchCriteria);

	//temp:
	throw new Error(searchCriteria['loggedIn']);

	var users = context.functions.execute("getUsersCollection");
	var result = await users.updateOne(searchCriteria, updatingObject);

	try {
		result = context.functions.execute("getMessageFromResult", result, 'update');
	} catch (e) {
		throw new Error(e.message);
	}
	return result;


	function mergeObjects(obj1, obj2) {
		var res = {};
		for (var i = 0; i < arguments.length; i++) {
			for (var x in arguments[i]) {
				res[x] = arguments[i][x];
			}
		}
		return res;
	}

};
