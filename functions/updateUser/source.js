exports = async function(user, uniqueSearchCriteria, updatingObject) {
	var defaultSearchCriteria = {email: user.email, password: user.password, loggedIn: true};
	modifyObject(defaultSearchCriteria, uniqueSearchCriteria);

	var users = context.functions.execute("getUsersCollection");
	var result = await users.updateOne(defaultSearchCriteria, updatingObject);

	return context.functions.execute("getMessageFromResult", result, 'update');


	function modifyObject(objectToModify, overwritingObject) {
		Object.assign(objectToModify, overwritingObject);
	}
};
