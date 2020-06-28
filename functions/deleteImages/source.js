exports = async function(_user_id, _image_ids) {

	var result = await __deleteImages();
	return context.functions.execute("getMessageFromCRUDResult", result, 'delete');


	async function __deleteImages() {
		var images = context.functions.execute("getImagesCollection");

		try {
			var result = images.deleteMany({
				_user_id,
				_id: {$in: _image_ids}
			});
		} catch (e) {
			throw new Error(e.message);
		}
		return result;
	}


};
