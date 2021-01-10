exports = async function({name, sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			var user = await exec("getLoggedInUser", {sessionID});
			var result = await __deleteLibrary(name, user._id);

			return exec("getMessageFromUpdateOrDeleteResult", result, 'delete');
		}
	);


	async function __deleteLibrary(name, _user_id) {
		var libraries = exec("getLibrariesCollection");
		return await libraries.deleteOne({_user_id, name});
	}

};
