// 	images: Array<{name, src, description, tags, date, rating, location}>

exports = async function({sessionID, images}) {
	return await exec("handlePublicFunction",
		arguments[0],

		async (params) => {
			var user = await exec("getUser", params);
			var imageDocs = exec("getNewImageDocuments", params.images, user._id);

			var result = await addNewImagesToDB(imageDocs)
			return exec("getMessageFromInsertResult", result, imageDocs.length);
		}
	);


	async function addNewImagesToDB(imageDocs) {
		const images = exec("getImagesCollection");
		return await images.insertMany(imageDocs);
	}


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
