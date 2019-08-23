// propertyToSet can contain dot-notation

exports = function(propertyToSet, itsValue) {
	let obj = {$set: {}};
	obj['$set'][propertyToSet] = itsValue;
	return obj;
};
