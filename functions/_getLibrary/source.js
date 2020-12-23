exports = async function(_user_id, name) {
	var libraries = context.functions.execute("getLibrariesCollection");
	var library = await libraries.findOne({_user_id, name});

	if (!(library)) throw new Error("No such library found");

	return library;
};
