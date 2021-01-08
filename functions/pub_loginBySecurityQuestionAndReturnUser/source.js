exports = async function({email, securityQuestion}) {
	return await exec("handlePublicFunction",

		async () => {
			let user = await exec("getUserByEmail", email);
			errorIfQuestionsDontMatch(user.securityQuestion, securityQuestion);

			let sessionID = await exec("loginUserByEmailAndReturnSessionID", email);
			return await exec("getLoggedInUser", {sessionID});
		}
	);


	function errorIfQuestionsDontMatch(storedQuestion, submittedQuestion) {
		submittedQuestion.answer = submittedQuestion.answer.toLowerCase();
		submittedQuestion.answer = exec("getHash", submittedQuestion.answer);

		exec("errorIfSecurityQuestionInvalid", storedQuestion, submittedQuestion);
	}


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
