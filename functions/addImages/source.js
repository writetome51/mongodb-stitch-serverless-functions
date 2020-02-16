exports = async function(props) {
	// Make sure user exists and is logged in before continuing:
	var user = await getUser(props.sessionID);
	var imageDocs = getNewImageDocuments(props.images, user._id);

	var images = getImagesCollection();
	var result = await images.insertMany(imageDocs);

	return getMessageFromResult(result, imageDocs.length);


	async function getUser(sessionID){
		return await exec("getUser", sessionID);
	}


	function getNewImageDocuments(images, user_id){
		return exec("getNewImageDocuments", images, user_id);
	}


	function getImagesCollection(){
		return exec("getImagesCollection");
	}


	function getMessageFromResult(result, intendedNumberCreated){
		return exec("getMessageFromInsertResult", result, intendedNumberCreated);
	}


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
