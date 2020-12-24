exports = async function({email, securityQuestion}) {
	return await exec("handlePublicFunction",
		arguments[0],

		async ({email, securityQuestion}) => {
			let user = await exec("getUserByEmail", email);
			errorIfQuestionsDontMatch(user.securityQuestion, securityQuestion);

			let sessionID = await exec("loginUserByEmailAndReturnSessionID", email);
			return await exec("getUser", {sessionID});
		}
	);


	function errorIfQuestionsDontMatch(storedQuestion, submittedQuestion) {
		submittedQuestion.answer = submittedQuestion.answer.toLowerCase();
		submittedQuestion.answer = exec("getHash", submittedQuestion.answer);

		exec("validateSecurityQuestion", storedQuestion, submittedQuestion);
	}


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
