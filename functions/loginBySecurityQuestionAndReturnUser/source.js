exports = async function({email, securityQuestion}) {
	var result;

	try {
		let user = await exec("getUserByEmail", email);
		errorIfQuestionsDontMatch(user.securityQuestion, securityQuestion);

		let sessionID = await exec("loginUserByEmailAndReturnSessionID", email);
		result = await exec("getUser", sessionID);
	}
	catch (error) {
		result = {error};
	}
	return result;


	function errorIfQuestionsDontMatch(storedQuestion, submittedQuestion) {
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
