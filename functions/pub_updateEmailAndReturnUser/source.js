exports = async function({email, password, newEmail, sessionID}) {
	const {exec} = require("realm-function-exec");

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

};
