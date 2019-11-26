exports = async (email) => {
	var users = context.functions.execute("getUsersCollection");
	var user = await users.findOne({email});

	if (!(user))  return {success: false};
	else return {success:true};
};
