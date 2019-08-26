// Returns:  {success: true} | {error: {message: string}} | {error: any}

exports = async function(properties) {
	// properties = {email:string, password:string, newPassword:string}.

	// Make sure requested user exists and that provided password is correct:
	var user = await context.functions.execute("getUser", properties.email, properties.password);
	if (user.error) return user;

	var result = await context.functions.execute(
		"updateProperty", user, "password", properties.newPassword
	);
	return context.functions.execute("getMessageFromResult", result, 'update');
};
