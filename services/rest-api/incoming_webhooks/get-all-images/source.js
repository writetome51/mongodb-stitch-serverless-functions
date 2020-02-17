// Returns all of a user's images.

exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['batchSize', 'batchNumber'],
		// batchSize = number of images to be returned from a request.
		// batchNumber = which batch of {batchSize} images to return,
		// i.e., if batchNumber is 1 and batchSize is 20, images 1 thru 20 are returned.
		// If batchNumber is changed to 2, images 21 thru 40 are returned.

		async (props) => {
			var user = await context.functions.execute("getUser", props.sessionID);
			return await context.functions.execute("getAllUserImages",
				user._id, props.batchSize, props.batchNumber
			);
		}
	);
};
