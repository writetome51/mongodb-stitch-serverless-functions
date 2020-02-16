// 'props': {sessionID: string,  name: string,  changes: object}

exports = async function(_user_id, name, changes) {

	let searchCriteria = {'_user_id': _user_id, 'name': name};

	let updatingObject = {'$set': changes};

	// These two properties must never be changed:
	delete updatingObject['$set']['_user_id'];
	delete updatingObject['$set']['_id'];

	return await context.functions.execute("updateDocument",
		"image-library-app-image", searchCriteria, updatingObject
	);
};
