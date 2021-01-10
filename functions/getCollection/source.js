exports = function(collectionName) {
	return context.services.get("mongodb-atlas").db("rest-api").collection(collectionName);
};
