exports = async function(_image_ids, batchSize, batchNumber) {

	return await context.functions.execute("getBatchOfImages",

		async function() {
			let imagesCollection = context.functions.execute("getImagesCollection");
			let unsortedImages = await imagesCollection.find({_id: {$in: _image_ids}}).toArray();
			return getSorted(unsortedImages);
		},

		batchSize,
		batchNumber
	);


	function getSorted(unsortedImages){
		// The array returned must be in same order as _image_ids.
		let sorted = [];
		for (let i = 0; i < _image_ids.length; ++i) {

			for (let ii = 0; ii < unsortedImages.length; ++ii) {

				if (unsortedImages[ii]['_id'] === _image_ids[i]) {
					sorted[i] = unsortedImages[ii];
					unsortedImages.splice(ii, 1); // removes that item.
					break;
				}

			}

		}
		return sorted;
	}

};
