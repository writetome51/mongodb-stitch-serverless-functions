exports = async function(props) {

	var result = await removeUser();
	return context.functions.execute("getMessageFromCRUDResult", result, 'delete');


	async function removeUser() {
		var users = context.functions.execute("getUsersCollection");

		try {
			var result = await users.deleteOne({
				loggedIn: true,
				sessionID: props.sessionID,
				email: props.email,
				password: props.password
			});
		} catch (e) {
			throw new Error(e.message);
		}
		return result;
	}


};
