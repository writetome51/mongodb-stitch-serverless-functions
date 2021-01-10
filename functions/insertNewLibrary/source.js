exports = async function(doc) {
	const {exec} = require("realm-function-exec");

	var libraries = exec("getLibrariesCollection");
	var result = await libraries.insertOne(doc);

	return exec("getMessageFromInsertResult", result, 1);
};
