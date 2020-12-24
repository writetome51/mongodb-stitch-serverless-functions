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

			return await context.functions.execute("pub_createAndReturnUser", props);
		}
	);
};
