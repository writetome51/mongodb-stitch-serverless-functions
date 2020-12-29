exports = async function({sessionID}) {
	return await exec("handlePublicFunction",
		async () => {
			let user = await exec("getUser", {sessionID});
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
