exports = async function(searchCriteria) {
	var users = context.functions.execute("getUsersCollection");
	return await users.findOne(searchCriteria);
};
