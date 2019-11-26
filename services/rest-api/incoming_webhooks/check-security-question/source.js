exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['email', 'securityQuestion'],

		async (props) => {

			let user = await context.functions.execute("getUserByEmail", props.email);
			if (user.securityQuestion.question !== props.securityQuestion.question) {
				throw new Error(`This is not the correct user. The security questions don't match`);
			}
			if (user.securityQuestion.answer !== props.securityQuestion.answer) {
				return {success: false};
			}
			return {success: true};
		}
	);
};
