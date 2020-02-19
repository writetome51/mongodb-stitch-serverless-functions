// Only use this function when user has forgotten password and is logging in
// after answering security question.

exports = async function(email) {
	return await context.functions.execute("loginUserBySubmittedCriteriaAndReturnSessionID",
		{email},
		'User not found.  The email may be incorrect'
	);
};
