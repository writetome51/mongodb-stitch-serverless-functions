exports = function(properties) {
	const {exec} = require("realm-function-exec");

	if (properties.password) properties.password = exec("getHash", properties.password);

	if (properties.securityQuestion && properties.securityQuestion.answer) {
		properties.securityQuestion.answer = properties.securityQuestion.answer.toLowerCase();

		properties.securityQuestion.answer = exec("getHash", properties.securityQuestion.answer);
	}
	return properties;
};
