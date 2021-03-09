// returns: {images: Image[], from: 'all'}

exports = async function({batchSize, batchNumber, sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			let user = await exec("getLoggedInUser", {sessionID});
			let imagesCollection = exec("getImagesCollection");
			let result = {from: 'all'};

			result['images'] = await imagesCollection.aggregate([
				{$match: {_user_id: user._id}},
				{$sort: {_id: 1}}, // ascending id order.
				{$skip: (batchNumber - 1) * batchSize},
				{$limit: batchSize}
			]).toArray();

			return result;
		}
	);
};
