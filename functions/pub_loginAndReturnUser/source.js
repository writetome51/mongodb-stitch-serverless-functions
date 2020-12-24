exports = async function ({email, password}) {
	password = context.functions.execute("getHash", password);

	try{
		var sessionID = await context.functions.execute("loginUserAndReturnSessionID",
			email, password
		);
		return await context.functions.execute("pub_getUser", {sessionID});
	}
	catch (error) {
		return {error};
	}
};
