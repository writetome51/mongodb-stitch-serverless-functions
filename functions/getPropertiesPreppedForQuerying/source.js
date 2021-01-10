exports = function(payload, requiredProperties) {
	const {exec} = require("realm-function-exec");

	var properties = getValidatedRequestProperties(payload, requiredProperties);

	return exec("ifHasPasswordAndSecurityQuestionAnswer_getHashed", properties);


	function getValidatedRequestProperties(payload, requiredProperties) {
		return exec("getValidatedRequestProperties", payload, requiredProperties);
	}


	function getHash(string) {
		return exec("getHash", string);
	}

};
