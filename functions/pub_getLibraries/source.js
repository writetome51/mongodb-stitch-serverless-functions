exports = async function({sessionID}) {
	return await exec("handlePublicFunction",
		arguments[0],

		async (params) => {
			let user = await exec("getUser", params);
			return await __getLibraries(user._id);
		}
	);


	async function __getLibraries(_user_id) {
		var libCollection = exec("getLibrariesCollection");
		return await libCollection.find({_user_id}).toArray();
	}


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
