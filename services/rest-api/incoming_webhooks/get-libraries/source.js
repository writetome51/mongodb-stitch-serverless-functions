// Returns all of a user's libraries.

exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		[],

		async (props) => {
			var user = await context.functions.execute("getUser", props);
			return await context.functions.execute("getLibraries", user._id);
		}
	);
};
