exports = async function({sessionID, email, password}) {

	var result = await __deleteUser();
	return exec("getMessageFromUpdateOrDeleteResult", result, 'delete');


	async function __deleteUser() {
		var users = exec("getUsersCollection");

		return await users.deleteOne({
			loggedIn: true,
			sessionID,
			email,
			password
		});
	}


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
