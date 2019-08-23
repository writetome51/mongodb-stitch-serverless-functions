exports = async function(email, password) {
	var users = context.functions.execute("getUsersCollection");

	try {
		var doc = await users.findOne({email, password});
	} catch (e) {
		return {error: e};
	}

	return doc;
};
