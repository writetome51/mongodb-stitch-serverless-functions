exports = async function(collection, matchCriteria) {
	return await collection.aggregate([
		{$match: matchCriteria},
		{$count: "dataTotal"}
	]);
};
