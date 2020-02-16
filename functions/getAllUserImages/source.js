exports = async function(_user_id) {
	try {
		var images = await __getAllUserImages();
	} catch (e) {
		throw new Error(e.message);
	}
	return images;


	async function __getAllUserImages() {
		var imagesCollection = context.functions.execute("getImagesCollection");
		return await imagesCollection.find({_user_id}).toArray();
	}
};
