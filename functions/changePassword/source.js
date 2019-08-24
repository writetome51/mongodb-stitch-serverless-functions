// Returns:  {success: true} | {error: {message: string}} | {error: any}

exports = async function(properties) {
	// properties = {email:string, password:string, newPassword:string}.

	// Make sure requested user exists and that provided password is correct:
	var user =  await context.functions.execute("getUser", properties.email, properties.password);
	if (user.error) return user;

	var result = await updateOne(user, properties.newPassword);
	return context.functions.execute("getMessageFromResult", result, 'update');


	async function updateOne(user, newPassword) {
		var users = context.functions.execute("getUsersCollection");

		try {
			var result = await users.updateOne(
				{email: user.email, password: user.password},
				{$set: {password: newPassword}}
			);
		} catch (e) {
			return {error: e};
		}
		return result;
	}


};
