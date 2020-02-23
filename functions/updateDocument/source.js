exports = async function updateDocument(collectionName, searchCriteria, updatingObject) {
	// These two properties must never be changed:
	delete updatingObject['$set']['_user_id'];
	delete updatingObject['$set']['_id'];

	var collection = context.functions.execute("getCollection", collectionName);

	var result = await collection.updateOne(searchCriteria, updatingObject);

	try {
		result = context.functions.execute("getMessageFromCRUDResult", result, 'update');
	} catch (e) {
		throw new Error(e.message);
	}
	return result;
};
