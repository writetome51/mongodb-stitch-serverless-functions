exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		[],

		async (props) => {
			var user = await context.functions.execute("getUser", props.email, props.password);
			return await context.functions.execute("getLibraries", user._id);
		}
	);
};
