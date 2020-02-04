exports = function(userID, libraryName) {
	return {
		_id: BSON.ObjectId().toString(), // unique value, cannot ever change.
		_user_id: userID, // cannot ever change, or relation to user document is lost.
		name: libraryName,
		images: []
	};
};
