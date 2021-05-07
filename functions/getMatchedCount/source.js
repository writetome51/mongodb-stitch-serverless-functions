// returns: {dataTotal: integer}

exports = async function(collection, matchCriteria) {
	let result = await collection.aggregate([
		{$match: matchCriteria},
		{$count: "dataTotal"}
	]).toArray();

	if (result.length === 0) return {dataTotal: 0};
	return result[0];
};
