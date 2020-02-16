exports = async function(_user_id) {
	try {
		var libraries = await __getLibraries();
	} catch (e) {
		throw new Error(e.message);
	}
	return libraries;


	async function __getLibraries() {
		var libCollection = context.functions.execute("getLibrariesCollection");
		return await libCollection.find({_user_id}).toArray();
	}
};
