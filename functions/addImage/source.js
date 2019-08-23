// Returns:  {success: true} | {error: {message: string}} | {error: any}

exports = async function(doc) {
	// doc = {email:string, password:string, libraryName: string, image: {src: string}}

	if (!(doc.image.src)) return {error: {message: "The submitted image must have a 'src' property"}};

	var user = await getUser(doc.email, doc.password);
	if (user.error) return user;

	var library = user.libraries[doc.libraryName];
	if (!(library)) return {error: {message: "No such library found"}};

	library = library.concat(doc.image); // library is just array of images.

	var result = await updateOne(user, library);
	return context.functions.execute("getMessageFromResult", result);


	async function updateOne(user, library) {
		var users = context.functions.execute("getUsersCollection");
		var updatingObject = context.functions.execute(
			"getUpdatingObject", ('libraries.' + doc.libraryName), library
		);

		try {
			var result = await users.updateOne(
				{email: user.email, password: user.password},
				updatingObject
			);
		} catch (e) {
			return {error: e};
		}
		return result;
	}


	async function getUser(email, password) {
		return context.functions.execute("getUser", email, password);
	}


};
