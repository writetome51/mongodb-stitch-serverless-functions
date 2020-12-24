exports = async function({sessionID}) {
	return await exec("handlePublicFunction",
		arguments[0],
		async ({sessionID}) => await exec("getUser", {sessionID})
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
