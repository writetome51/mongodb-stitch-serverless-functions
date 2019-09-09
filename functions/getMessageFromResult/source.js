exports = function(result, crudOperationThatProducedResult) {
	if (crudOperationThatProducedResult === 'update') {
		if ((result['matchedCount'] > 0) && (result['modifiedCount'] === result['matchedCount'])) {
			return {success: true};
		}
	}
	if (crudOperationThatProducedResult === 'delete') {
		if (result['deletedCount'] > 0) return {success: true};
	}

	throw new Error("Operation not performed.  No document matched the request criteria");
};
