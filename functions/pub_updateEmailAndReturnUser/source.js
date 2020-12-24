exports = async function({email, password, newEmail, sessionID}) {
	let params = arguments[0];
	try {
		params = context.functions.execute(
			"ifHasPasswordAndSecurityQuestionAnswer_getHashed", params
		);
		return await context.functions.execute("updateAndReturnUserAlreadyLoggedIn",
			params.sessionID,
			{
				email: params.email,
				password: params.password
			},
			{$set: {"email": params.newEmail}}
		);
	}
	catch (error) {
		return {error};
	}

};
