exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['password', 'email', 'newEmail'],

		async (props) => {
			return await context.functions.execute("updateAndReturnUser",
				props.sessionID,
				{
					email: props.email,
					password: props.password
				},
				{$set: {"email": props.newEmail}}
			);
		}
	);
};
