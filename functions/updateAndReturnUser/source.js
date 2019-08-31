exports = async function(user, uniqueSearchCriteria, updatingObject) {

	var result = await context.functions.execute("updateUser",
		user, uniqueSearchCriteria, updatingObject
	);

	if (result.success) {
		if (user.newPassword) user.password = user.newPassword; // Must be updated to get user.
		if (user.newEmail) user.email = user.newEmail; // Must be updated to get user.

		result = await context.functions.execute("getUser",
			user.email, user.password
		);
	}
	return result;
};
