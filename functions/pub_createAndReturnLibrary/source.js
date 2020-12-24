exports = async function({name, sessionID}) {
	return await exec("handlePublicFunction",
		arguments[0],

		async (params) => {
			let user = await exec("pub_getUser", params);
			let lib = exec("getNewLibraryDocument", user._id, params.name);

			let result = await exec("insertNewLibrary", lib);
			if (result.success) return lib;
		}
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
