exports = async function({email, password, securityQuestion}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",

		async () => {
			let params = getRequiredPropertiesAdded({email, password, securityQuestion});
			await createUser(params);
			return await exec("getLoggedInUser", params);
		}
	);


	function getRequiredPropertiesAdded(props) {
		props = exec("ifHasPasswordOrSecurityQuestionAnswer_getHashed", props);

		props['loggedIn'] = true;
		props['lastLoggedIn'] = new Date();
		props['_id'] = BSON.ObjectId().toString(); // unique value, cannot ever change.

		// Unique value. User needs this to access his data.
		props['sessionID'] = BSON.ObjectId().toString();
		return props;
	}


	async function createUser(doc) {
		var users = exec("getUsersCollection");

		var result = await users.insertOne(doc);

		exec("getMessageFromInsertResult", result, 1);
	}

};
