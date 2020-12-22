exports = async function({email, password, newPassword, sessionID}) {
	let params = arguments[0];

	try {
		params = context.functions.execute("ifHasPasswordAndSecurityQuestionAnswer_getHashed", params);

		params = context.functions.execute("getPropertiesAfterComparingOldAndNewPasswords", params);

		return await context.functions.execute("updateAndReturnUserAlreadyLoggedIn",
			params.sessionID,
			{
				email: params.email,
				password: params.password
			},
			{$set: {"password": params.newPassword}}
		);
	}
	catch (error) {
		return {error};
	}

};
