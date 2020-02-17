exports = async function(_user_id, batchSize, batchNumber) {
	try {
		var images = await __getAllUserImages();
	} catch (e) {
		throw new Error(e.message);
	}
	return images;


	async function __getAllUserImages() {
		var imagesCollection = context.functions.execute("getImagesCollection");
		let howManyToSkip = (batchNumber - 1) * batchSize;

		let docs = imagesCollection.find({_user_id}).limit(1).toArray();
		return JSON.parse(docs.toString()).length;
		//return get_ids(docs);
		//		return await imagesCollection.find({_user_id}).skip(howManyToSkip).sort({name:
		//		1}).limit(batchSize).toArray();
	}


	function get_ids(array) {
		for (var i = 0, _ids = []; i < array.length; ++i) {
			_ids[i] = array[i]['_id'];
		}
		return _ids;
	}


	function sortByName(images) {
		images.sort((a, b) => {
			let aName = a['name'];
			let bName = b['name'];

			// decides if a or b comes first.
			return String(aName).localeCompare(String(bName), 'en', {caseFirst: 'upper'});
		});
	}


	/********************

	function getBatch(batchNumber, batchSize, arr) {
		let start = (batchNumber - 1) * batchSize;
		let end = start + batchSize - 1;
		return _arraySlice(start, end, arr);
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

	 ***********************/

};
