// Returns all images in one of a user's libraries.

exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['name', 'batchSize', 'batchNumber'],

		async (props) => {
			var user = await context.functions.execute("getUser", props.sessionID);
			var library = await context.functions.execute("getLibrary", user._id, props.name);

			return await context.functions.execute("getLibraryImages",
				library._image_ids, props.batchSize, props.batchNumber
			);
		}
	);
};
