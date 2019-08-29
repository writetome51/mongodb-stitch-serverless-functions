exports = async function(user, uniqueSearchCriteria, updatingObject) {
	var defaultSearchCriteria = {email: user.email, password: user.password, loggedIn: true};
	modifyObject(defaultSearchCriteria, uniqueSearchCriteria);

	var users = context.functions.execute("getUsersCollection");
	return await users.updateOne(defaultSearchCriteria,  updatingObject);

	
	function modifyObject(objectToModify, overwritingObject){
		Object.assign(objectToModify, overwritingObject);
	}
};
