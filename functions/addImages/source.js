exports = async function(props) {
	// Make sure user exists and is logged in before continuing:
	await context.functions.execute("getUser", props.sessionID);

	var images = context.functions.execute("getImagesCollection");

	var imageDocs = context.functions.execute("getNewImageDocuments", props.images);

	var result = await images.insertMany(imageDocs);

	// If insert was successful, result will contain 'insertedIds' for each image.
	if (result.insertedIds && (result.insertedIds.length === imageDocs.length)) {
		return {success: true};
	}
	else throw new Error(result);
};
