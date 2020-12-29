exports = async function({email, password, newEmail, sessionID}) {
	return await exec("handlePublicFunction",

		async () => {
			let params = exec("ifHasPasswordAndSecurityQuestionAnswer_getHashed",
				{email, password, newEmail, sessionID}
			);
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
