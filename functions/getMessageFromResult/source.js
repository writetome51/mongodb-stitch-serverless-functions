exports = function(result, crudOperationThatProducedResult){
  if (crudOperationThatProducedResult === 'update'){
    if (result['matchedCount'] === 1 && result['modifiedCount'] === 1) {
	    return {success: true};
    }
  }
  if (crudOperationThatProducedResult === 'delete'){
    if (result['deletedCount'] === 1) return {success: true};
  }

	if (result.error) return result;
	else return {error: result};
};
