exports = async function(doc) {
	var users = context.functions.execute("getUsersCollection");

	var result = await users.insertOne(doc);

	return context.functions.execute("getMessageFromInsertResult", result, 1);
};
