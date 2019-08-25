// Returns:  {success: true} | {error: {message: string}} | {error: any}

exports = async function(doc) {
	// doc = {email:string, password:string, libraryName: string, image: {src: string}}

	if (!(doc.image.src)) return {error: {message: "The submitted image must have a 'src' property"}};

	var user = await getUser(doc.email, doc.password);
	if (user.error) return user;

	var library = user.libraries[doc.libraryName];
	if (!(library)) return {error: {message: "No such library found"}};

	library = library.concat(doc.image); // library is just array of images.

	var result = await context.functions.execute(
		"updateProperty", user, ('libraries.' + doc.libraryName), library
	);
	return context.functions.execute("getMessageFromResult", result, 'update');


	async function getUser(email, password) {
		return context.functions.execute("getUser", email, password);
	}


};
