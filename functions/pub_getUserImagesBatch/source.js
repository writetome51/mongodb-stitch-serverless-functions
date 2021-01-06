exports = async function({batchSize, batchNumber, sessionID}) {
	return await exec("handlePublicFunction",
		async () => {
			let imagesCollection = exec("getImagesCollection");

			let user = await context.functions.execute("getUser", {sessionID});
			let imagesCursor = await imagesCollection.find({_user_id: user._id});
			var dataTotal = await imagesCursor.count();

			var images = imagesCursor.sort({_id: 1})
				.skip((batchNumber - 1) * batchSize)
				.limit(batchSize).toArray();

			return await exec("getBatchOfImages",
				images,
				dataTotal
			);
		}
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
