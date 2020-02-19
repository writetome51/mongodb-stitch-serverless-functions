exports = async function(_image_ids, batchSize, batchNumber) {
	try {
		var images = await __getLibraryImages();
	} catch (e) {
		throw new Error(e.message);
	}
	return images;


	async function __getLibraryImages() {
		var imagesCollection = context.functions.execute("getImagesCollection");
		var images = await imagesCollection.find({_id: {$in: _image_ids}}).toArray();

		if (!(images)) throw new Error("No images found");
		return images;
	}
};
