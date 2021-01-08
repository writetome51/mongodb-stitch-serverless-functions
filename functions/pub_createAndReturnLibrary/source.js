exports = async function({name, sessionID}) {
	return await exec("handlePublicFunction",

		async () => {
			let user = await exec("getLoggedInUser", {sessionID});
			let lib = exec("getNewLibraryDocument", user._id, name);

			let result = await exec("insertNewLibrary", lib);
			if (result.success) return lib;
		}
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
