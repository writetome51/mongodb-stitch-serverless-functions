// Returns:  {success: true} | {error: {message: string}} | {error: any}

exports = async function(properties) {
	// properties = {email: string, password:string, newPassword:string, sessionID: string}.

	return await context.functions.execute("updateAndReturnUser",
		properties,
		{
			email: properties.email,
			password: properties.password
		},
		{$set: {"password": properties.newPassword}}
	);
};
