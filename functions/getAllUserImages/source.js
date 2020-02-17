exports = async function(_user_id, batchSize, batchNumber) {
	try {
		var images = await getBatchOfImages();
	} catch (e) {
		throw new Error(e.message);
	}
	return images;


	async function getBatchOfImages() {
		let images = await getAllImagesSorted(_user_id);

		let [startIndex, endIndex] = get_startIndex_endIndex(batchSize, batchNumber);
		if ((startIndex + 1) > images.length) throw new Error(`Batch does not exist`);

		return _arraySlice(startIndex, endIndex, images);
	}


	async function getAllImagesSorted(_user_id) {
		var imagesCollection = context.functions.execute("getImagesCollection");
		return await imagesCollection.find({_user_id}).sort({_id: 1}).toArray();
	}


	function get_startIndex_endIndex(batchSize, batchNumber) {
		let startIndex = (batchNumber - 1) * batchSize;
		let endIndex = startIndex + batchSize - 1;
		return [startIndex, endIndex];
	}


	function _arraySlice(start, end, arr) {
		let len = arr.length;
		let range = [];

		start = idx(len, start);
		end = idx(len, end, len);

		while (start < end) {
			range.push(arr[start++]);
		}
		return range;


		function idx(len, pos, end = undefined) {
			if (pos == null) {
				pos = end || 0;
			} else if (pos < 0) {
				pos = Math.max(len + pos, 0);
			} else {
				pos = Math.min(pos, len);
			}

			return pos;
		}

	}


};
