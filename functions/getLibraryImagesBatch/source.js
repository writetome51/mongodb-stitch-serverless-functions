exports = async function(_image_ids, batchSize, batchNumber) {

	return await context.functions.execute("getBatchOfImages",
		getImagesInProperOrder,
		batchSize,
		batchNumber
	);


	async function getImagesInProperOrder() {
		let imagesCollection = context.functions.execute("getImagesCollection");
		let unorderedImages = await imagesCollection.find({_id: {$in: _image_ids}}).toArray();

		return getOrdered(unorderedImages);


		function getOrdered(unorderedImages) {
			// The array returned must be in same order as _image_ids.
			let ordered = [];
			for (let i = 0; i < _image_ids.length; ++i) {

				for (let ii = 0, brk = false; (ii < unorderedImages.length) && !(brk); ++ii) {

					if (unorderedImages[ii]['_id'] === _image_ids[i]) {

						ordered[i] = unorderedImages[ii];
						try {
							ordered.push(1, 2);
							ordered.splice(1);
							// unorderedImages.splice(ii, 1); // removes that item.
						} catch (e) {
							throw new Error(e);
						}
						brk = true;
					}

				}

			}
			return ordered;
		}

	}


};
