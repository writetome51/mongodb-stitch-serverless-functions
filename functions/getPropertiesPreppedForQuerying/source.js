exports = function(payload, requiredProperties) {
	var properties = context.functions.execute(
		"getValidatedRequestProperties_or_Error", payload, requiredProperties
	);

	properties.password = context.functions.execute("getHashString", properties.password);
	return properties;
};
