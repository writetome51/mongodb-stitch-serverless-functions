exports = async function(sessionID) {

	var result = await removeUser();
	return context.functions.execute("getMessageFromResult", result, 'delete');


	async function removeUser() {
		var users = context.functions.execute("getUsersCollection");

		try {
			var result = await users.deleteOne({sessionID, loggedIn: true});
		} catch (e) {
			throw new Error(e.message);
		}
		return result;
	}


};
