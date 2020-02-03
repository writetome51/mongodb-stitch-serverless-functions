exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		[],

		async (props) => {
			var users = context.functions.execute("getUsersCollection");
			var result = await users.updateOne(
				{'sessionID': props.sessionID, 'loggedIn': true},
				{$set: {'loggedIn': false}}
			);

			try {
				result = context.functions.execute("getMessageFromResult", result, 'update');
			} catch (e) {
				throw new Error(e.message);
			}

			return result;
		}
	);
};
