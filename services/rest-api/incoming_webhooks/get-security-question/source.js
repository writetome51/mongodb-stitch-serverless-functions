exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['email'],

		async (props) => {
			let user = await context.functions.execute("getUserByEmail", props.email);
			return user.securityQuestion;
		}
	);
};
