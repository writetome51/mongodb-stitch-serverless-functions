// changes: object

exports = async function(_user_id, name, changes) {
	const exec = require('realm-function-exec');

	let searchCriteria = {_user_id, name};
	let updater = {'$set': changes};

	return await exec("updateDocument",
		"image-library-app-image", searchCriteria, updater
	);
};
