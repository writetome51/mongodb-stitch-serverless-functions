// This function is the webhook's request handler.
exports = async function(payload, response) {
	var body = context.functions.execute("getValidatedRequestBody_or_Error", payload);
	if (body.error) return JSON.stringify(body);

	body['libraries'] = [];
	body.password =  context.functions.execute("getHashString", body.password);

	var result = await context.functions.execute("createUser", body);
	return JSON.stringify(result);
};
