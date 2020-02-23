// changes: object

exports = async function(_user_id, name, changes) {

	let searchCriteria = { _user_id, name};

	let updatingObject = {'$set': changes};

	return await context.functions.execute("updateDocument",
		"image-library-app-image", searchCriteria, updatingObject
	);
};
