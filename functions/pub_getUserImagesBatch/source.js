exports = async function({batchSize, batchNumber, sessionID}) {
	var {_user_id} = await context.functions.execute("getUser", {sessionID});
	let imagesCollection = exec("getImagesCollection");
	let imagesCursor = await imagesCollection.find({_user_id});
	let dataTotal = imagesCursor.count();
	let images = imagesCursor.sort({_id: 1})
		.skip((batchNumber - 1) * batchSize)
		.limit(batchSize).toArray();

	return await exec("getBatchOfImages",
		images,
		dataTotal
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
