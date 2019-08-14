// This function is the webhook's request handler.
exports = async function(payload, response) {
	var body = context.functions.execute("getRequestBody", payload);

	if (invalid(body.secret)) return JSON.stringify({error: {message: "invalid secret"}});
	if (!(body.email) || !(body.password)) return JSON.stringify(
		{error: {message: "At least 1 of the required POST parameters is missing"}}
	);

	// encrypt body.password here before passing it to createUser()...

	body['libraries'] = [];
	var result = await context.functions.execute("createUser", body);
	return JSON.stringify(result);


	function invalid(secret) {
		return context.functions.execute("secretInvalid", secret);
	}

};
