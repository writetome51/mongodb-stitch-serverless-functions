exports = async function(_user_id, libraryName) {

	var result = await __deleteLibrary();
	return context.functions.execute("getMessageFromCRUDResult", result, 'delete');


	async function __deleteLibrary() {
		var libraries = context.functions.execute("getLibrariesCollection");

		try {
			var result = await libraries.deleteOne({_user_id, name: libraryName});
		} catch (e) {
			throw new Error(e.message);
		}
		return result;
	}


};
