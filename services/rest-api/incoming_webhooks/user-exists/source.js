exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['email'],

		async (props) => {
			var users = context.functions.execute("getUsersCollection");
			var user = await users.findOne({email: props.email});
			if (!(user))  throw new Error("User does not exist");
			else return {success:true};
		}
	);
};
