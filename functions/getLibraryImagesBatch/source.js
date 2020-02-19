exports = async function(_image_ids, batchSize, batchNumber) {

	return await context.functions.execute("getBatchOfImages",

		async function() {
			let imagesCollection = context.functions.execute("getImagesCollection");
			return await imagesCollection.find({_id: {$in: _image_ids}}).toArray();
		},

		batchSize,
		batchNumber
	);

};
