exports = async function(searchCriteria) {
	const {exec} = require("realm-function-exec");

	var libraries = exec("getLibrariesCollection");
	var library = await libraries.findOne(searchCriteria);

	if (!(library)) throw new Error("No such library found");

	return library;
};
