exports = async function(user, uniqueSearchCriteria, updatingObject) {
	var defaultSearchCriteria = {email: user.email, password: user.password, loggedIn: true};
	var searchCriteria = mergeObjects(defaultSearchCriteria, uniqueSearchCriteria);

	var users = context.functions.execute("getUsersCollection");
	var result = await users.updateOne(searchCriteria, updatingObject);

	return context.functions.execute("getMessageFromResult", result, 'update');


	function mergeObjects(){
 		var res = {};
 		for(var i = 0;i<arguments.length;i++){
			for(x in arguments[i]){
				res[x] = arguments[i][x];
			}
 		}
 		return res;
	}

};



