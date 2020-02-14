exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['imageNames'],

		async (props) => {
			// 'props': { sessionID,  imageNames }

			var user = await context.functions.execute("getUser", props.sessionID);

			return await context.functions.execute("removeImages", user._id, props.imageNames);
		}
	);
};
