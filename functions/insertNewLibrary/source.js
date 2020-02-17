exports = async function(doc) {
	var libraries = context.functions.execute("getLibrariesCollection");

	var result = await libraries.insertOne(doc);

	return context.functions.execute("getMessageFromInsertResult", result, 1);
};
