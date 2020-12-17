exports = async function(sessionID) {
	return await context.functions.execute("updateUserAlreadyLoggedIn",
		sessionID,
		{},
		{$set: {'loggedIn': false}}
	);
};
