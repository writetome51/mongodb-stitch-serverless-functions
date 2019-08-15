exports = async function(payload, response) {

	const secret =  payload.query.secret;
	if (invalid(secret)) return JSON.stringify({error: "invalid secret"});

	if (!(payload.query.email) || !(payload.query.password)) return JSON.stringify(
		{error: {message: "These GET parameters are required:  'email', 'password' ."}}
	);
	const email = payload.query.email;
	const password =  context.functions.execute("getHashString", payload.query.password);

	const result = await context.functions.execute("getUser", email, password);
	return JSON.stringify(result);


	function invalid(secret) {
		return context.functions.execute("secretInvalid", secret);
	}
};
