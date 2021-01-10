exports = async function(_user_id, imagesToChange) {
	/********************
	// imagesToChange: ImageToChange[]
	// 	  ImageToChange = {
	// 	       name: name of image being updated;
	//         changes: object
	// 		   (The properties in 'changes' can contain dot-notation)
	// 	  }
	 *******************/

	const exec = require("realm-function-exec");

	for (let i = 0; i < imagesToChange.length; ++i) {
		let imageToChange = imagesToChange[i];

		await exec("updateImage",
			_user_id, imageToChange['name'], imageToChange['changes']
		);
	}
	return {success: true};
};
