// Returns:  {success: true} | {error: {message: string}} | {error: any}

exports = async function(doc) {
	// doc = {email:string, password:string, libraryName: string}.
	
	var user = await context.functions.execute("getUser", doc.email, doc.password);
	if (user.error) return user;

	user.libraries[doc.libraryName] = [];

	var result = await updateLibraries(user);
	return context.functions.execute("getMessageFromResult", result);


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
