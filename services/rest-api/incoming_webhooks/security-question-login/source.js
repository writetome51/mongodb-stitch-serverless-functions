exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['email', 'securityQuestion'],

		async (props) => {

			let user = await context.functions.execute("getUserByEmail", props.email);

			context.functions.execute("errorIfSecurityQuestionInvalid",
				user.securityQuestion, props.securityQuestion
			);

			let sessionID = await context.functions.execute("loginUserByEmailAndReturnSessionID",
				props.email
			);
			return await context.functions.execute("getUser", {sessionID});
		}
	);
};
