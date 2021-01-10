// 	images: Array<{name, src, description, tags, date, rating, location}>

exports = async function({sessionID, images}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",

		async () => {
			var user = await exec("getLoggedInUser", {sessionID});
			var imageDocs = exec("getNewImageDocuments", images, user._id);

			var result = await addNewImagesToDB(imageDocs)
			return exec("getMessageFromInsertResult", result, imageDocs.length);
		}
	);


	async function addNewImagesToDB(imageDocs) {
		const images = exec("getImagesCollection");
		return await images.insertMany(imageDocs);
	}

};
