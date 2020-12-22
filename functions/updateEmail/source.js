exports = async function({email, password, newEmail, sessionID}) {
	try {
		let params = {email, password, newEmail, sessionID};
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
