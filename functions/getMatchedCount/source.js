// returns: {dataTotal: integer}

exports = async function(collection, matchCriteria) {
	let result = await collection.aggregate([
		{$match: matchCriteria},
		{$count: "dataTotal"}
	]).toArray();

	return result[0];
};
