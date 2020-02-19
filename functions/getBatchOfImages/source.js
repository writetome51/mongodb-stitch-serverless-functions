exports = async function(getImagesFunction, batchSize, batchNumber) {

	let images = await getImagesFunction();

	let [startIndex, endIndex] = get_startIndex_endIndex(batchSize, batchNumber);
	if ((startIndex + 1) > images.length) throw new Error(`Batch does not exist`);

	return _arraySlice(startIndex, endIndex + 1, images);


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
