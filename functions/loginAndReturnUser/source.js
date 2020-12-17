exports = async function (props) {
	var  {email, password} = props;
	var result;

	try{
		var sessionID = await context.functions.execute("loginUserAndReturnSessionID",
			email, password
		);
		result = await context.functions.execute("getUser", sessionID);
	}
	catch (error) {
		result = {error};
	}
	return result;
};
