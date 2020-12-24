exports = async function({email, password, newPassword, sessionID}) {
	return await exec("handlePublicFunction",
		arguments[0],

		async (params) => {
			params = exec("ifHasPasswordAndSecurityQuestionAnswer_getHashed", params);
			params = exec("getPropertiesAfterComparingOldAndNewPasswords", params);

			return await exec("updateAndReturnUserAlreadyLoggedIn",
				params.sessionID,
				{
					email: params.email,
					password: params.password
				},
				{$set: {"password": params.newPassword}}
			);
		}
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
