// 'searchCriteria': {_user_id: string, name: string}

exports = async function(searchCriteria, updatingObject) {

	return await context.functions.execute("updateDocument",
		"image-library-app-library", searchCriteria, updatingObject
	);

};
