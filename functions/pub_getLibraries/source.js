exports = async function({sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			let user = await exec("getLoggedInUser", {sessionID});
			return await __getLibraries(user._id);
		}
	);


	async function __getLibraries(_user_id) {
		var libCollection = exec("getLibrariesCollection");
		return await libCollection.find({_user_id}).toArray();
	}

};
