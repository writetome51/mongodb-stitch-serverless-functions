// If `batchNumber` === 1, returns: {batch: Image[], dataTotal: integer}
// Else, returns: {batch: Image[]}

exports = async function({batchSize, batchNumber, sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			let user = await exec("getLoggedInUser", {sessionID});
			let imagesCollection = exec("getImagesCollection");
			let result = {};

			if (batchNumber === 1) {
				result = await exec("getMatchedCount", imagesCollection, {_user_id: user._id});
			}
			result["batch"] = await imagesCollection.aggregate([
				{$match: {_user_id: user._id}},
				{$sort: {_id: 1}}, // ascending id order.
				{$skip: (batchNumber - 1) * batchSize},
				{$limit: batchSize}
			]).toArray();

			return result;
		}
	);
};
