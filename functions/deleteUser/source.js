exports = async function({sessionID, email, password}) {
	let props = arguments[0];

	var result = await __deleteUser();
	return context.functions.execute("getMessageFromUpdateOrDeleteResult", result, 'delete');


	async function __deleteUser() {
		var users = context.functions.execute("getUsersCollection");

		return await users.deleteOne({
			loggedIn: true,
			sessionID: props.sessionID,
			email: props.email,
			password: props.password
		});
	}

};
