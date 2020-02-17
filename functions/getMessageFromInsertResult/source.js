exports = function(result, intendedNumberDocumentsCreated) {
	if ((result.insertedId && intendedNumberDocumentsCreated === 1) ||
		(result.insertedIds && (result.insertedIds.length === intendedNumberDocumentsCreated))
	) {
		return {success: true};
	}
	else throw new Error(result);
};
