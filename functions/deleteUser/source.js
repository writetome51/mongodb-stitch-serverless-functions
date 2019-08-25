exports = async function(email, password) {

	var result = await removeUserWith(email, password);
	return context.functions.execute("getMessageFromResult", result, 'delete');


	async function removeUserWith(email, password) {
		var users = context.functions.execute("getUsersCollection");

		try {
			var result = await users.deleteOne({email, password});
		} catch (e) {
			return {error: e};
		}
		return result;
	}


};
