exports = function(properties) {
	properties.newPassword = context.functions.execute("getHash", properties.newPassword);

	if (properties.password === properties.newPassword) throw new Error(
		"The current password and the new password cannot match."
	);
	else return properties;
};
