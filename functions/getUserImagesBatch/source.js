exports = async function(_user_id, batchSize, batchNumber) {
	try {
		var images = await getBatch();
	} catch (e) {
		throw new Error(e.message);
	}
	return images;


	async function getBatch() {
		let images = await getAllImagesSorted(_user_id);

		return context.functions.execute("getBatchOfImages",
			images, batchSize, batchNumber
		);
	}


	async function getAllImagesSorted(_user_id) {
		var imagesCollection = context.functions.execute("getImagesCollection");
		return await imagesCollection.find({_user_id}).sort({_id: 1}).toArray();
	}

};
