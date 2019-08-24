// Returns:  {success: true} | {error: {message: string}} | {error: any}

exports = async function(properties) {
	// properties = {email:string, password:string, newPassword:string}.

	var user =  context.functions.execute("getUser", properties.email, properties.password);
	if (user.error) return user;

	var result = await updateOne(user, properties.newPassword);
	return context.functions.execute("getMessageFromResult", result);


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
