exports = async function(payload) {

	return await context.functions.execute("processRequest",
		payload,
		[],

		async (props) => {
			return await context.functions.execute("updateUserAlreadyLoggedIn",
				props.sessionID,
				{},
				{$set: {'loggedIn': false}}
			);

		}
	);

};
