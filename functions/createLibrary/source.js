// Returns:  {success: true} | {error: {message: string}} | {error: any}

exports = async function(doc) {
	// doc = {email:string, password:string, libraryName: string}.
	var user = await getUser(doc.email, doc.password);
	if (user.error) return user;

	user.libraries[doc.libraryName] = [];

	var result = await updateLibraries(user);
	return getMessageFromDocumentUpdateResult(result);


	async function getUser(email, password) {
		return context.functions.execute("getUser", email, password);
	}


	async function updateLibraries(user) {
		var collectionName = context.values.get("image-lib-app-collection");
		var users = context.functions.execute("getCollection", collectionName);

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


	function getMessageFromDocumentUpdateResult(result) {
		if (result['matchedCount'] === 1 && result['modifiedCount'] === 1) {
			return {success: true};
		}
		if (result.error) return result;
		else return {error: result};
	}


};
