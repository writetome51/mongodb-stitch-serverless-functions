exports = async function(doc) {
	var libraries = context.functions.execute("getLibrariesCollection");

	var result = await libraries.insertOne(doc);

	// If insert was successful, result will contain 'insertedId'.
	if (result.insertedId) return {success: true};

	else throw new Error(result);
};
