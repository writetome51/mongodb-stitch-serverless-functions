exports = async function(doc) {
	var libraries = exec("getLibrariesCollection");
	var result = await libraries.insertOne(doc);

	return exec("getMessageFromInsertResult", result, 1);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}
};
