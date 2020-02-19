exports = async function(email, password) {
	return await context.functions.execute("loginUserBySubmittedCriteriaAndReturnSessionID",
		{email, password},
		'User not found.  The password may be incorrect'
	);
};
