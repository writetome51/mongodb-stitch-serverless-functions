exports = async function(_user_id, libraryName) {
	try {
		var library = await __getLibrary();
	} catch (e) {
		throw new Error(e.message);
	}
	return library;


	async function __getLibrary() {
		var libraries = context.functions.execute("getLibrariesCollection");
		var library = await libraries.findOne({_user_id, name: libraryName});

		if (!(library)) throw new Error("No such library found");

		return library;
	}
};
