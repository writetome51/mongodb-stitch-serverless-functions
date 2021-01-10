exports = async function(sessionID, uniqueSearchCriteria, updater) {
	const {exec} = require("realm-function-exec");

	var defaultSearchCriteria = {sessionID, loggedIn: true};
	var searchCriteria = mergeObjects(defaultSearchCriteria, uniqueSearchCriteria);

	return await exec("updateDocument",
		exec("getUsersCollection"), searchCriteria, updater
	);


	function mergeObjects(obj1, obj2) {
		let keys = Object.keys(obj2);

		for (var i = 0, len = keys.length; i < len; i++) {
			obj1[keys[i]] = obj2[keys[i]];
		}
		return obj1;
	}

};
