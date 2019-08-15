// If `payload.body` is valid, it's returned.
// If not valid, error is returned.

exports = async function(payload, requiredProperties) {
	var body = context.functions.execute("getRequestBody", payload);

	if (invalid(body.secret)) return {error: {message: "invalid secret"}};
	delete body.secret;

	try {
		checkIfMissing(requiredProperties);
	} catch (e) {
		return {error: e};
	}
	return body;


	function invalid(secret) {
		return context.functions.execute("secretInvalid", secret);
	}


	function checkIfMissing(requiredProperties) {
		if (anyAreMissing(requiredProperties)) new Error(
			`These request body properties are required: ${requiredProperties} .`
		);


		function anyAreMissing(requiredProperties) {
			for (let i = 0; i < requiredProperties.length; ++i) {
				if (body[requiredProperties[i]] === undefined) return true;
			}
			return false;
		}
	}


};
