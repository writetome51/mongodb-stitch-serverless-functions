exports = async function(_user_id, batchSize, batchNumber) {

	return await context.functions.execute("getBatchOfImages",

		async function() {
			let imagesCollection = context.functions.execute("getImagesCollection");
			return await imagesCollection.find({_user_id}).sort({_id: 1}).toArray();
		},

		batchSize,
		batchNumber
	);

};
