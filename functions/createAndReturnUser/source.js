exports = async function(props) {
	try {
		//temp:
		if (typeof props === 'object') return {error:{message: props.password}};

		props = getRequiredProperties(props);
		await createUser(props);
		return await context.functions.execute("getUser", props.sessionID);
	}
	catch (error) {
		return {error};
	}


	function getRequiredProperties(props) {
		props = context.functions.execute("ifHasPasswordAndSecurityQuestionAnswer_getHashed", props);

		props['loggedIn'] = true;
		props['lastLoggedIn'] = new Date();
		props['_id'] = BSON.ObjectId().toString(); // unique value, cannot ever change.

		// Unique value. User needs this to access his data.
		props['sessionID'] = BSON.ObjectId().toString();
		return props;
	}


	async function createUser(doc) {
		var users = context.functions.execute("getUsersCollection");

		var result = await users.insertOne(doc);

		context.functions.execute("getMessageFromInsertResult", result, 1);
	}

};
