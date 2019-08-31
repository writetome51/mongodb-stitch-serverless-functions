// Returns:  {success: true} | {error: {message: string}} | {error: any}

exports = async function(properties) {
	// properties = {email:string, password:string, newPassword:string}.

	// Make sure requested user exists and that provided password is correct:
	var user = await context.functions.execute("getUser", properties.email, properties.password);

	return await context.functions.execute("updateAndReturnUser",
		properties, {}, {$set: {"password": properties.newPassword}}
	);
};