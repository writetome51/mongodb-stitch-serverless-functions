exports = function(result){
	if (result['matchedCount'] === 1 && result['modifiedCount'] === 1) {
		return {success: true};
	}
	if (result.error) return result;
	else return {error: result};
};
