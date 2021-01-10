exports = function(properties) {
	const {exec} = require("realm-function-exec");

	if (properties.password) properties.password = getHash(properties.password);

	if (properties.securityQuestion && properties.securityQuestion.answer) {
		properties.securityQuestion.answer = properties.securityQuestion.answer.toLowerCase();

		properties.securityQuestion.answer = getHash(properties.securityQuestion.answer);
	}
	return properties;


	function getHash(string) {
		return exec("getHash", string);
	}

};
