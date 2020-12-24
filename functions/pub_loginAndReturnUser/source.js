exports = async function({email, password}) {
	return await exec("handlePublicFunction",
		arguments[0],

		async ({email, password}) => {
			password = exec("getHash", password);
			var sessionID = await exec("loginUserAndReturnSessionID", email, password);
			return await exec("getUser", {sessionID});
		}
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
