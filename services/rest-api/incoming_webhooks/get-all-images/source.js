// Returns all of a user's images.

exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		[],

		async (props) => {
			var user = await context.functions.execute("getUser", props.sessionID);
			return await context.functions.execute("getAllUserImages", user._id);
		}
	);
};
