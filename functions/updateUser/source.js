exports = async function(sessionID, uniqueSearchCriteria, updatingObject) {
	var defaultSearchCriteria = {'sessionID': sessionID, 'loggedIn': true};
	var searchCriteria = mergeObjects(defaultSearchCriteria, uniqueSearchCriteria);

	//temp:
	throw new Error(Object.keys(searchCriteria).join(', '));

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
		let args = [obj1, obj2];
		for (var i = 0; i < args.length; i++) {
			let keys = Object.keys(args[i]);
			for (var j = 0; j < keys.length; ++j) res[keys[j]] = args[i][keys[j]];
		}
		return res;
	}

};
