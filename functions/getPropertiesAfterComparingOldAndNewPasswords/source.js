exports = function(properties) {
	properties.newPassword = context.functions.execute("getHashString", properties.newPassword);

	if (properties.password === properties.newPassword) return {
		error: {message: "The current password and the new password cannot match."}
	};
	else return properties;
};
