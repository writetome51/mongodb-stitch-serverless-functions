// Returns:  {success: true} | {error: {message: string}} | {error: any}

exports = async function(doc) {
	// doc = {email:string, password:string, libraryName: string, image: {src: string}}
	var user = await getUser(doc.email, doc.password);
	if (user.error) return user;

	var library = user.libraries[doc.libraryName];
	library.push(doc.image); // library is just array of images.

	var result = await updateOne(user, library);
	return getMessageFrom(result);


	async function getUser(email, password) {
		return context.functions.execute("getUser", email, password);
	}


	async function updateOne(user, library) {
		var collectionName = context.values.get("image-lib-app-collection");
		var users = context.functions.execute("getCollection", collectionName);

		try {
			var result = await users.updateOne(
				{email: user.email, password: user.password},
				{$set: {libraries[doc.libraryName]: library}}
			);
		} catch (e) {
			return {error: e};
		}
		return result;
	}


	function getMessageFrom(result) {
		if (result['matchedCount'] === 1 && result['modifiedCount'] === 1) {
			return {success: true};
		}
		if (result.error) return result;
		else return {error: result};
	}


};
