// If `payload.body` is valid, it's returned.
// If not valid, error is returned.

exports = async function(payload, requiredProperties) {
	var properties;
	if (payload.body) properties = context.functions.execute("getRequestBody", payload);
	else properties = payload.query;

	try {
		checkIfMissing(requiredProperties);
	} catch (e) {
		return {error: e};
	}

	if (invalid(properties.secret)) return {error: {message: "invalid secret"}};
	delete properties.secret;
	return properties;


	function invalid(secret) {
		return context.functions.execute("secretInvalid", secret);
	}


	function checkIfMissing(requiredProperties) {
		if (anyAreMissing(requiredProperties)) new Error(
			`These request properties are required: ${requiredProperties} .`
		);


		function anyAreMissing(requiredProperties) {
			for (let i = 0; i < requiredProperties.length; ++i) {
				if (properties[requiredProperties[i]] === undefined) return true;
			}
			return false;
		}
	}


};
