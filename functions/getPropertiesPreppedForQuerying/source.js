exports = function(payload, requiredProperties) {
	var properties = getValidatedRequestProperties(payload, requiredProperties);

	return exec("ifHasPasswordAndSecurityQuestionAnswer_getHashed", properties);


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
