exports = async function(searchCriteria) {
	const {exec} = require("realm-function-exec");

	var users = exec("getUsersCollection");
	return await users.findOne(searchCriteria);
};
