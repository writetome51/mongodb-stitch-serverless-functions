exports = async function(email, password) {
	var collectionName = context.values.get("image-lib-app-collection");
	var users = context.functions.execute("getCollection", collectionName);

	try {
		var doc = await users.findOne({email, password});
	} catch (e) {
		return {error: e};
	}

	return doc;
};
