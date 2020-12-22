exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['imageNames'],

		async (props) => {
			// 'props': { sessionID,  imageNames }

			var user = await context.functions.execute("getUser", props);

			return await context.functions.execute("deleteImagesAndRemoveFromAssociatedLibraries",
				user._id,
				props.imageNames
			);
		}
	);
};
