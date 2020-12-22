exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['name'],

		async (props) => {
			var user = await context.functions.execute("getUser", props);
			return await context.functions.execute("getLibrary", user._id, props.name);
		}
	);
};
