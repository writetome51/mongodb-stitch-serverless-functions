exports = async function(payload, response) {
	response.setHeader("Access-Control-Allow-Origin", "*");

	return await context.functions.execute("processRequest",
		payload,
		['email', 'password'],

		async (props) => {
			var sessionID = await context.functions.execute("loginUserAndReturnSessionID",
				props.email, props.password
			);
			return await context.functions.execute("getUser", sessionID);
		}
	);
};
