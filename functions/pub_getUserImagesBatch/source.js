exports = async function({batchSize, batchNumber, sessionID}) {
	return await exec("handlePublicFunction",
		async () => {
			let user = await exec("getLoggedInUser", {sessionID});
			let result = {};
			let imagesCollection = exec("getImagesCollection");
			if (batchNumber === 1) {
				result = await exec("getMatchedCount", imagesCollection, {_user_id: user._id});
			}
			let images = await imagesCollection.aggregate([
				{$match: {_user_id: user._id}},
				{$sort: {_id: 1}}, // ascending id order.
				{$skip: (batchNumber - 1) * batchSize},
				{$limit: batchSize}
			]).toArray();

			return Object.assign(result, {batch: images});
		}
	);
};


function exec(funcName, ...args) {
	return context.functions.execute(funcName, ...args);
}
