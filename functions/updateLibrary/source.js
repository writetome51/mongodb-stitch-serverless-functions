// 'searchCriteria': {_user_id: string, name: string}

exports = async function(searchCriteria, updatingObject) {
	const {exec} = require('realm-function-exec');

	return await exec("updateDocument",
		exec("getLibrariesCollection"), searchCriteria, updatingObject
	);

};
