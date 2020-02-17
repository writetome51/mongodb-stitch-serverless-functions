exports = async function(_user_id, batchSize, batchNumber) {
	try {
		var images = await __getBatchOfImages();
	} catch (e) {
		throw new Error(e.message);
	}
	return images;


	async function __getBatchOfImages() {
		let docs = getAllImages();
		let _ids = get_ids(docs);
		let startIndex = (batchNumber - 1) * batchSize;
		let endIndex = startIndex + batchSize - 1;
		let searchCriteria = {
			_user_id,
			_id: {$gte: _ids[startIndex], $lte: _ids[endIndex]}
		};
		if (_ids[endIndex] === undefined) delete searchCriteria['_id']['$lte'];
		if ((startIndex + 1) > _ids.length) throw new Error(`Batch does not exist`);

		return await imagesCollection.find(searchCriteria).toArray();
	}


	async function getAllImages(){
		var imagesCollection = context.functions.execute("getImagesCollection");
		return await imagesCollection.find({_user_id}).sort({_id: 1}).toArray();
	}


	function get_ids(array) {
		for (var i = 0, _ids = []; i < array.length; ++i) {
			_ids[i] = array[i]['_id'];
		}
		return _ids;
	}


};
