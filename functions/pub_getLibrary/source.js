exports = async function({name, sessionID}) {
	return await exec("handlePublicFunction",
		async () => {
			var user = await exec("getLoggedInUser", {sessionID});
			return await exec("getLibrary", user._id, name);
		}
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
