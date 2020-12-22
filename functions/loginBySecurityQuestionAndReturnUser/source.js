exports = async function({email, securityQuestion}) {
	try {
		let user = await exec("getUserByEmail", email);
		errorIfQuestionsDontMatch(user.securityQuestion, securityQuestion);

		let sessionID = await exec("loginUserByEmailAndReturnSessionID", email);
		return await exec("getUser", {sessionID});
	}
	catch (error) {
		return {error};
	}


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
