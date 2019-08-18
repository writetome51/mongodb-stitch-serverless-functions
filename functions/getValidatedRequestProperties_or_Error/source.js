exports = function(payload, requiredProperties) {

	var properties;
	if (!(payload.query)) properties = context.functions.execute("getRequestBody", payload);
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
		if (anyAreMissing(requiredProperties)) throw new Error(
			`These request properties are required: ${requiredProperties.join(', ')} `
		);


		function anyAreMissing(requiredProperties) {
			for (let i = 0; i < requiredProperties.length; ++i) {
				if (properties[requiredProperties[i]] === undefined) return true;
			}
			return false;
		}
	}


};
