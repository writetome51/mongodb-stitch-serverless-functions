exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['secret', 'email', 'password'],

		async (users, props) => {
			var result = await users.updateOne(
				{email: user.email, password: user.password, loggedIn: true},
				{$set: {loggedIn: false}}
			);

			result = context.functions.execute("getMessageFromResult", result, 'update');
			return JSON.stringify(result);
		}
	);
};