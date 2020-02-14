exports = async function(_user_id, imageNames) {

	var result = await __deleteImages();
	return context.functions.execute("getMessageFromResult", result, 'delete');


	async function __deleteImages() {
		var images = context.functions.execute("getImagesCollection");

		try {
			var result = images.deleteMany({
				_user_id,
				name: {$in: imageNames}
			});
		} catch (e) {
			throw new Error(e.message);
		}
		return result;
	}


};
