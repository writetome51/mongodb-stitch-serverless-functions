exports = async function(payload, response) {

	var body = context.functions.execute("getRequestBody", payload);

	if (invalid(body.secret)) return JSON.stringify({error: "invalid secret"});
	if (!(body.email) || !(body.password) || !(body.library)) return JSON.stringify(
		{error: {message: "These PATCH parameters are required:  'email', 'password', 'library' ."}}
	);
	if (!(body.library.images)) body.library.images = [];

	body.password =  context.functions.execute("getHashString", body.password);

	var result = await context.functions.execute("createLibrary", body);
	return JSON.stringify(result);


	function invalid(secret) {
		return context.functions.execute("secretInvalid", secret);
	}

};
