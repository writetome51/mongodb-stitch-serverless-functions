// `image`: {
// 		name: string;
// 		changes: object;
//			(Every property must be an image property that will be updated.
//			(The properties can be strings that contain dot-notation)
//			The property value is the new value to be saved.)
// 	}

exports = async function(_user_id, image) {
	const {exec} = require('realm-function-exec');

	let searchCriteria = {_user_id, name: image.name};
	let updater = {'$set': image.changes};

	return await exec("updateDocument",
		"image-library-app-image", searchCriteria, updater
	);
};
