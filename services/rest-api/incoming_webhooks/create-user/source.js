exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['email', 'password', 'securityQuestion'],

		async (props) => {

			props['loggedIn'] = true;
			props['lastLoggedIn'] = new Date();
			props['_id'] = BSON.ObjectId().toString(); // unique value, cannot ever change.

			// Unique value. User needs this to access his data.
			props['sessionID'] = BSON.ObjectId().toString();

			let result = await context.functions.execute("pub_createAndReturnUser", props);

			if (result.success) return await context.functions.execute("getUser", props);
			else throw new Error(result);
		}
	);
};
