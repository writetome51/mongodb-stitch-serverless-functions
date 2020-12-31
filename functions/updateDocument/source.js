exports = async function updateDocument(collectionName, searchCriteria, updatingObject) {
	// These two properties must never be changed:
	delete updatingObject['$set']['_user_id'];
	delete updatingObject['$set']['_id'];

	var collection = exec("getCollection", collectionName);

	var result = await collection.updateOne(searchCriteria, updatingObject);

	return exec("getMessageFromUpdateOrDeleteResult", result, 'update');


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
