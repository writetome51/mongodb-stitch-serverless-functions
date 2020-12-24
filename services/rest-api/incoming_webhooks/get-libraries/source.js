// Returns all of a user's libraries.

exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		[],

		async (props) => {
			var user = await context.functions.execute("pub_getUser", props);
			return await context.functions.execute("pub_getLibraries", user._id);
		}
	);
};
