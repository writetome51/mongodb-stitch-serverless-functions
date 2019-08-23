exports = function(){
	var collectionName = context.values.get("image-lib-app-collection");
	return context.functions.execute("getCollection", collectionName);
};
