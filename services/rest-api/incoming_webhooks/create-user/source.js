exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['securityQuestion'],

		async (props) => {
			// props.securityQuestion: {question: string, answer: string}
			props.securityQuestion.answer = context.functions.execute("getHashString",
				props.securityQuestion.answer
			);

			props['libraries'] = {};
			props['loggedIn'] = true;
			props['lastLoggedIn'] = new Date();
			let result = await context.functions.execute("createUser", props);

			if (result.success) return await context.functions.execute("getUser",
				props.email, props.password
			);
			else throw new Error(result);
		}
	);
};
