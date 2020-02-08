exports = async function(props) {
	// Make sure user exists and is logged in before continuing:
	var user = await context.functions.execute("getUser", props.sessionID);
	var imageDocs = context.functions.execute("getNewImageDocuments", props.images, user._id);

	var images = context.functions.execute("getImagesCollection");
	var result = await images.insertMany(imageDocs);

	// If insert was successful, result will contain 'insertedIds' for each image.
	if (result.insertedIds && (result.insertedIds.length === imageDocs.length)) {
		return {success: true};
	}
	else throw new Error(result);
};
