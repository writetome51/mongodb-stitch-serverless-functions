exports = async function({name, sessionID}) {
	return await exec("handlePublicFunction",
		async () => {
			var user = await exec("getUser", {sessionID});
			var result = await __deleteLibrary(name, user._id);

			return exec("getMessageFromUpdateOrDeleteResult", result, 'delete');
		}
	);


	async function __deleteLibrary(name, _user_id) {
		var libraries = exec("getLibrariesCollection");
		return await libraries.deleteOne({_user_id, name});
	}


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
