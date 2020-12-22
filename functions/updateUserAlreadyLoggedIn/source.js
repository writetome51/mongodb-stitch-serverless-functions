exports = async function(sessionID, uniqueSearchCriteria, updatingObject) {
	var defaultSearchCriteria = {sessionID, loggedIn: true};
	var searchCriteria = mergeObjects(defaultSearchCriteria, uniqueSearchCriteria);

	var users = context.functions.execute("getUsersCollection");
	var result = await users.updateOne(searchCriteria, updatingObject);

	try {
		return context.functions.execute("getMessageFromUpdateOrDeleteResult", result, 'update');
	}
	catch (error) {
		return {error};
	}


	function mergeObjects(obj1, obj2) {
		var res = {};
		let args = [obj1, obj2];

		for (var i = 0; i < args.length; i++) {
			let obj = args[i];
			let keys = Object.keys(obj);

			for (var j = 0; j < keys.length; ++j) res[keys[j]] = obj[keys[j]];
		}
		return res;
	}

};
