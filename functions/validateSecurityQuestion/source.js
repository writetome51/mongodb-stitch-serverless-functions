exports = function(storedQuestion, submittedQuestion) {
	if (storedQuestion.question !== submittedQuestion.question) {
		throw new Error(`This is not the correct user. The security questions don't match`);
	}
	if (storedQuestion.answer !== submittedQuestion.answer) {
		throw new Error(`Incorrect answer`);
	}
};
