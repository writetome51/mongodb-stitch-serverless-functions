exports = async function({name, batchSize, batchNumber, sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			var user = await exec("getLoggedInUser", {sessionID});
			var lib = await exec("getLibrary", {_user_id: user._id, name});
			var _image_ids = convertedToArray(lib._image_ids);
			_image_ids = _image_ids.splice((batchNumber - 1) * batchSize, batchSize);
			let images = await getImages(_image_ids);

			return {images, from: 'library'};


			function convertedToArray(arr) {
				return [].concat(arr);
			}


			async function getImages(_image_ids) {
				let unorderedImages = await getImagesFromCollection();
				return getOrdered(unorderedImages);


				async function getImagesFromCollection() {
					let imagesCollection = exec("getImagesCollection");
					let unorderedImages = await imagesCollection.find({_id: {$in: _image_ids}})
						.toArray();

					// .toArray() doesn't return Array prototype. This fixes that:
					return convertedToArray(unorderedImages);


				}


				function getOrdered(unorderedImages) {
					// The array returned must be in same order as `_image_ids`.

					let imagesByID = {};

					for (let idx = 0, len = unorderedImages.length; idx < len; ++idx) {
						let img = unorderedImages[idx];
						imagesByID[img._id] = img
					}

					let ordered = new Array(_image_ids.length);
					for (let idx = 0, len = _image_ids.length; idx < len; ++idx) {
						ordered[idx] = imagesByID[_image_ids[idx]];
					}
					return ordered;
				}

			}

		}
	);


};
