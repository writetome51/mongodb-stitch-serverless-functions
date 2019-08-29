exports = async function(user, uniqueSearchCriteria, updatingObject) {
	var defaultSearchCriteria = {email: user.email, password: user.password};
	modifyObject(defaultSearchCriteria, uniqueSearchCriteria);

	var users = context.functions.execute("getUsersCollection");
	var result = await users.updateOne(defaultSearchCriteria,  updatingObject);
	
	return result;

	
	function modifyObject(objectToModify, overwritingObject){
		Object.assign(objectToModify, overwritingObject);
	}
};