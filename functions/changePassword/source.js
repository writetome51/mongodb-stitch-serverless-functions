// Returns:  {success: true} | {error: {message: string}} | {error: any}

exports = async function(user) {
	// user = {email:string, password:string, newPassword:string}.

	var result = await updateOne(user);
	return context.functions.execute("getMessageFromResult", result);


	async function updateOne(user) {
		var users = context.functions.execute("getUsersCollection");

		try {
			var result = await users.updateOne(
				{email: user.email, password: user.password},
				{$set: {password: user.newPassword}}
			);
		} catch (e) {
			return {error: e};
		}
		return result;
	}


};
