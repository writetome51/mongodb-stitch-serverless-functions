exports = async function(payload, response) {
	response.setHeader("Access-Control-Allow-Origin", "*");

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
