exports = async function(doc) {
	var users = context.functions.execute("getUsersCollection");

	try {
		var result = await users.insertOne(doc);
	} catch (e) {
		return {error: e};
	}

	// If insert was successful, result will contain 'insertedId'.
	if (result.insertedId) return {success: true};

	// Just in case the insert was performed without error,
	// but the result was not what we wanted:
	return {error: result};
};
