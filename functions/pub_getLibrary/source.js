exports = async function({name, sessionID}) {
	return await exec("handlePublicFunction",
		arguments[0],

		async (params) => {
			var user = await exec("getUser", params);
			return await exec("getLibrary", user._id, params.name);
		}
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
