exports = async function(props, requiredProps, uniqueCode) {
	var result;
	// Combine passed required properties with the defaults:
	requiredProps = ['secret', 'sessionID'].concat(requiredProps);

	try {
		props = context.functions.execute("getPropertiesPreppedForQuerying",
			props, requiredProps
		);
		result = await uniqueCode(props);

	} catch (e) {
		result = {error: {message: e.message}};
	}

	// We convert it to string before converting it back to an object because
	// it solves a problem in how MongoDB returns numbers and dates in its JSON.
	// For example, in a document, if you set a property 'dataTotal' to a value
	// of 2, the returned JSON will store 'dataTotal' like this:
	//
	//  "dataTotal": {"$numberInt": "2"}
	//
	// Calling JSON.stringify() on the object will convert the value {"$numberInt": "2"}
	// to 2, which is all we need.

	result = JSON.stringify(result);

	return JSON.parse(result);
};
