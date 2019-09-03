exports = async function(doc) {
	var libraries = context.functions.execute("getLibrariesCollection");

	doc['_id'] = BSON.ObjectId().toString(); // unique property, cannot ever change.

	var result = await libraries.insertOne(doc);

	// If insert was successful, result will contain 'insertedId'.
	if (result.insertedId) return {success: true};

	// Just in case the insert was performed without error,
	// but the result was not what we wanted:
	else throw new Error(result);
};
