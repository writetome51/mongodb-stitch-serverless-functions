exports = async function({email, password}) {
	return await exec("handlePublicFunction",
		async () => {
			password = exec("getHash", password);
			let sessionID = await exec("loginUserAndReturnSessionID", email, password);
			return await exec("getLoggedInUser", {sessionID});
		}
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
