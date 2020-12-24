// 	images: Array<{name, src, description, tags, date, rating, location}>

exports = async function({sessionID, images}) {
	let props = arguments[0];

	try {
		// Make sure user exists and is logged in before continuing:
		var user = await exec("pub_getUser", props);
		var imageDocs = exec("getNewImageDocuments", props.images, user._id);

		const images = exec("getImagesCollection");
		var result = await images.insertMany(imageDocs);

		return exec("getMessageFromInsertResult", result, imageDocs.length);
	}
	catch (error) {
		return {error};
	}


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
