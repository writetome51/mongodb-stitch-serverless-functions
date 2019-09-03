exports = async function(doc) {
	var users = context.functions.execute("getUsersCollection");

	doc['_id'] = BSON.ObjectId().toString();

	var result = await users.insertOne(doc);

	// If insert was successful, result will contain 'insertedId'.
	if (result.insertedId) return {success: true};

	// Just in case the insert was performed without error,
	// but the result was not what we wanted:
	else throw new Error(result);
};
