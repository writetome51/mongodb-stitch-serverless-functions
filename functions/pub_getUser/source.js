exports = async function({sessionID}) {
	return await exec("handlePublicFunction",
		async () => await exec("getUser", {sessionID})
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
