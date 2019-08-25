exports = async function(email, password, libraryName){

  	var user = await context.functions.execute("getUser", email, password);
	if (user.error) return user;

	delete user.libraries[libraryName];

	var result = await updateLibraries(user);
	return context.functions.execute("getMessageFromResult", result, 'update');


	async function updateLibraries(user) {
		var users = context.functions.execute("getUsersCollection");

		try {
			var result = await users.updateOne(
				{email: user.email, password: user.password},
				{$set: {libraries: user.libraries}}
			);
		} catch (e) {
			return {error: e};
		}
		return result;
	}
	
};