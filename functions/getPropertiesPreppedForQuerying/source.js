exports = function(payload, requiredProperties) {
	var properties = getValidatedRequestProperties(payload, requiredProperties);

	if (properties.password) properties.password = getHash(properties.password);

	if (properties.securityQuestion && properties.securityQuestion.answer) {
		properties.securityQuestion.answer = properties.securityQuestion.answer.toLowerCase();

		properties.securityQuestion.answer = getHash(properties.securityQuestion.answer);
	}
	return properties;


	function getValidatedRequestProperties(payload, requiredProperties) {
		return exec("getValidatedRequestProperties", payload, requiredProperties);
	}


	function getHash(string) {
		return exec("getHash", string);
	}


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
