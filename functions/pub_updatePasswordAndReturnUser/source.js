exports = async function({email, password, newPassword, sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			let params = getPreppedForDatabase({email, password, newPassword, sessionID});

			return await exec("updateAndReturnUser",
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
		params = exec("ifHasPasswordOrSecurityQuestionAnswer_getHashed", params);
		return exec("getPropertiesAfterComparingOldAndNewPasswords", params);
	}

};
