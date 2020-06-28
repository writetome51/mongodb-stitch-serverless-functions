exports = function(result, updateOrDelete) {

	if (updateOrDelete === 'update') {

		if (result['matchedCount'] > 0) {
			if (result['modifiedCount'] === result['matchedCount']) {
				return {success: true};
			}
			else throw new Error("Not every document found was updated");
		}
	}
	else if (updateOrDelete === 'delete') {
		if (result['deletedCount'] > 0) return {success: true};
	}

	throw new Error("Operation not performed.  No document matched the request criteria");
};
