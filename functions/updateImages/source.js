// imagesToChange: ImageToChange[]
// 	  ImageToChange = {
// 	       name: name of image being updated;
//         changes: object // The properties in 'changes' can contain dot-notation.
// 	  }
//

exports = async function(_user_id, imagesToChange) {

	for (let imageToChange of imagesToChange) {
		await context.functions.execute("updateImage",
			_user_id, imageToChange.name, imageToChange.changes
		);
	}
	return {success: true};
};
