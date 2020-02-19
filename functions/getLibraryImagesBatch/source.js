exports = async function(_image_ids, batchSize, batchNumber) {

	return await context.functions.execute("getBatchOfImages",

		async function() {
			let imagesCollection = context.functions.execute("getImagesCollection");
			let images = await imagesCollection.find({_id: {$in: _image_ids}}).toArray();

			// The array returned must be in same order as _image_ids.
			return _image_ids.map(
				(_id) => images.find((image) => image._id === _id)
			);
		},

		batchSize,
		batchNumber
	);

};
