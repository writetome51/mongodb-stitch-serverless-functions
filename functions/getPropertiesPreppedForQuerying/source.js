exports = async function(payload, requiredProperties) {
	var properties = context.functions.execute(
		"getValidatedRequestProperties_or_Error", payload, requiredProperties
	);
	if (properties.error) return properties;

	properties.password = context.functions.execute("getHashString", properties.password);
	return properties;
};
