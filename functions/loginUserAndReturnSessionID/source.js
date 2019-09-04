exports = async function(email, password) {
	var users = context.functions.execute("getUsersCollection");
	var sessionID = BSON.ObjectId().toString();

	var result = await users.updateOne(
		{email, password},
		{
			$currentDate: {lastLoggedIn: true}, // sets 'lastLoggedIn' to current date-time.
			$set: {loggedIn: true, sessionID}
		}
	);
	try {
		result = context.functions.execute("getMessageFromResult", result, 'update');
	} catch (e) {
		throw new Error(e.message);
	}
	if (result.success) return sessionID;
	else throw new Error('User not found. The password may be incorrect');
};
