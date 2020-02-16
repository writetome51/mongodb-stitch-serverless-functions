exports = async function updateDocument(collectionName, searchCriteria, updatingObject) {

	var collection = context.functions.execute("getCollection", collectionName);

	var result = await collection.updateOne(searchCriteria, updatingObject);

	try {
		result = context.functions.execute("getMessageFromCRUDResult", result, 'update');
	} catch (e) {
		throw new Error(e.message);
	}
	return result;
};
