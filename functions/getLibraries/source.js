exports = async function({sessionID}) {
	let params = arguments[0];
	try {
		var user = await context.functions.execute("getUser", params);
		return await __getLibraries(user._id);
	}
	catch (error) {
		return {error};
	}


	async function __getLibraries(_user_id) {
		var libCollection = context.functions.execute("getLibrariesCollection");
		return await libCollection.find({_user_id}).toArray();
	}
};
