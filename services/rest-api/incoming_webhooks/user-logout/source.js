exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['secret', 'email', 'password'],

		async (props) => {
			var result = await context.functions.execute("updateUser",
				props, {}, {$set: {loggedIn: false}}
			);
			result = context.functions.execute("getMessageFromResult", result, 'update');
			return JSON.stringify(result);
		}
	);
};
