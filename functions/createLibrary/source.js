// Returns:  {success: true} | {error: {message: string}} | {error: any}

exports = async function(doc) {
	// doc = {email:string, password:string, libraryName: string}.

	var user = await context.functions.execute("getUser", doc.email, doc.password);
	if (user.error) return user;

	user.libraries[doc.libraryName] = [];

	var result = await context.functions.execute(
		"updateProperty", user, "libraries", user.libraries
	);
	return context.functions.execute("getMessageFromResult", result, 'update');
};
