exports = async function updateDocument(collection, searchCriteria, updatingObject) {
	const {exec} = require("realm-function-exec");

	// These two properties must never be changed:
	delete updatingObject['$set']['_user_id'];
	delete updatingObject['$set']['_id'];

	var result = await collection.updateOne(searchCriteria, updatingObject);

	return exec("getMessageFromUpdateOrDeleteResult", result, 'update');
};
