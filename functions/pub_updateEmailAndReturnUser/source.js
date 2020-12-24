exports = async function({email, password, newEmail, sessionID}) {
	return await exec("handlePublicFunction",
		arguments[0],

		async (params) => {
			params = exec("ifHasPasswordAndSecurityQuestionAnswer_getHashed", params);

			return await exec("updateAndReturnUserAlreadyLoggedIn",
				params.sessionID,
				{
					email: params.email,
					password: params.password
				},
				{$set: {"email": params.newEmail}}
			);
		}
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
