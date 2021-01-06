// Returns all images in one of a user's libraries.

exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['name', 'batchSize', 'batchNumber'],

		async (props) => {
			var user = await context.functions.execute("getUser", props);
			var library = await context.functions.execute("pub_getLibrary", user._id, props.name);

			return await context.functions.execute("pub_getLibraryImagesBatch",
				library._image_ids, props.batchSize, props.batchNumber
			);
		}
	);
};
