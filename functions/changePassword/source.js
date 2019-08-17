// Returns:  {success: true} | {error: {message: string}} | {error: any}

exports = async function(user) {
	// user = {email:string, password:string, new_password:string}.

	var result = await updateOne(user);
	return getMessageFrom(result);


	async function updateOne(user) {
		var collectionName = context.values.get("image-lib-app-collection");
		var users = context.functions.execute("getCollection", collectionName);

		try {
			var result = await users.updateOne(
				{email: user.email, password: user.password},
				{$set: {password: user.new_password}}
			);
		} catch (e) {
			return {error: e};
		}
		return result;
	}


	function getMessageFrom(result) {
		if (result['matchedCount'] === 1 && result['modifiedCount'] === 1) {
			return {success: true};
		}
		if (result.error) return result;
		else return {error: result};
	}


};
