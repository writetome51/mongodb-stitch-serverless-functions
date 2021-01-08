exports = async function({name, batchSize, batchNumber, sessionID}) {
	return await exec("handlePublicFunction",
		async () => {
			var user = await exec("getLoggedInUser", {sessionID});
			var {_image_ids} = await exec("getLibrary", user._id, name);
			var dataTotal = _image_ids.length;
			_image_ids = _image_ids.splice((batchNumber - 1) * batchSize, batchSize);
			let images = await getImagesInProperOrder();

			return await exec("getBatchOfImages",
				images,
				dataTotal
			);


			async function getImagesInProperOrder() {
				let imagesCollection = exec("getImagesCollection");
				let unorderedImages = await imagesCollection.find({_id: {$in: _image_ids}})
					.toArray();

				// Still not clear why, but the Cursor method .toArray() doesn't return Array
				// prototype. This fixes that:
				unorderedImages = makeSureItsArray(unorderedImages);
				return getOrdered(unorderedImages);


				function getOrdered(unorderedImages) {
					// The array returned must be in same order as _image_ids.
					let ordered = new Array(_image_ids.length);
					for (let idx = 0, len = _image_ids.length; idx < len; ++idx) {
						ordered[idx] = unorderedImages.filter(
							(img) => img._id === _image_ids[idx]
						)[0];
					}
					return ordered;
				}


				function makeSureItsArray(arr) {
					return [].concat(arr);
				}

			}

		}
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}


};
