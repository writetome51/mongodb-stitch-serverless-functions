exports = function(result, intendedNumberDocumentsCreated) {
	if (result.insertedId ||
		(result.insertedIds && (result.insertedIds.length === intendedNumberDocumentsCreated))
	) {
		return {success: true};
	}
	else throw new Error(result);
};
