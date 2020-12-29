exports = async function({email, password, newPassword, sessionID}) {
	return await exec("handlePublicFunction",
		async () => {
			let params = getPreppedForDatabase({email, password, newPassword, sessionID});

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


	function getPreppedForDatabase(params) {
		params = exec("ifHasPasswordAndSecurityQuestionAnswer_getHashed", params);
		return exec("getPropertiesAfterComparingOldAndNewPasswords", params);
	}


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
