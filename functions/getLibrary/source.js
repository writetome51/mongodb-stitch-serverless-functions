exports = async function(_user_id, name) {
	const {exec} = require("realm-function-exec");

	var libraries = exec("getLibrariesCollection");
	var library = await libraries.findOne({_user_id, name});

	if (!(library)) throw new Error("No such library found");

	return library;
};
