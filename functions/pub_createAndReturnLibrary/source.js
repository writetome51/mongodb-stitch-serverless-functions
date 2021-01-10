exports = async function({name, sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",

		async () => {
			let user = await exec("getLoggedInUser", {sessionID});
			let lib = exec("getNewLibraryDocument", user._id, name);

			let result = await exec("insertNewLibrary", lib);
			if (result.success) return lib;
		}
	);

};
