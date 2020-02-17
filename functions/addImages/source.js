exports = async function(props) {
	// Make sure user exists and is logged in before continuing:
	var user = await exec("getUser", props.sessionID);
	var imageDocs = exec("getNewImageDocuments", props.images, user._id);

	var images = exec("getImagesCollection");
	var result = await images.insertMany(imageDocs);

	return exec("getMessageFromInsertResult", result, imageDocs.length);
};


function exec(funcName, ...args) {
	return context.functions.execute(funcName, ...args);
}
