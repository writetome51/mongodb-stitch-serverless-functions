exports = function(payload, requiredProperties) {
	var properties = context.functions.execute(
		"getValidatedRequestProperties_or_Error", payload, requiredProperties
	);

	if (properties.password) {
		properties.password = context.functions.execute("getHashString", properties.password);
	}
	if (properties.securityQuestion && properties.securityQuestion.answer) {
		properties.securityQuestion.answer = properties.securityQuestion.answer.toLowerCase();

		properties.securityQuestion.answer =
			context.functions.execute("getHashString", properties.securityQuestion.answer);
	}
	return properties;
};
