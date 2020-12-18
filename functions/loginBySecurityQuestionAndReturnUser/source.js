exports = async function({email, securityQuestion}) {
	var result;

	try {
		let user = await exec("getUserByEmail", email);
		errorIfQuestionsDontMatch(securityQuestion, user.securityQuestion);

		let sessionID = await exec("loginUserByEmailAndReturnSessionID", email);
		result = await exec("getUser", sessionID);
	}
	catch (error) {
		result = {error};
	}
	return result;


	function errorIfQuestionsDontMatch(submittedQuestion, storedQuestion) {
		submittedQuestion.answer = submittedQuestion.answer.toLowerCase();
		submittedQuestion.answer = getHash(submittedQuestion.answer);

		context.functions.execute("validateSecurityQuestion",
			storedQuestion, submittedQuestion
		);
	}


	function getHash(string) {
		return exec("getHash", string);
	}


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
