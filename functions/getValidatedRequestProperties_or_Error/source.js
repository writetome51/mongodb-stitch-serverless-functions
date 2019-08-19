exports = function(payload, requiredProperties) {

	var properties;
	if (!(payload.query)) properties = context.functions.execute("getRequestBody", payload);
	else properties = payload.query;

	try {
		checkIfMissing(requiredProperties);
	} catch (e) {
		return {error: e};
	}

	if (invalid(properties.secret)) return {error: {message: "invalid secret"}};
	requiredProperties = getArrayWithoutValue('secret', requiredProperties);
	removeAnyPropertiesNotRequired(properties);

	return properties;


	function removeAnyPropertiesNotRequired(properties){
		for (let prop in properties){
			if (!(includes(prop, requiredProperties))) delete properties[prop];
		}
	}


	function includes(value, array){
		for (var i = 0;  i < array.length;  ++i){
			if (array[i] === value) return true;
		}
		return false;
	}


	function getArrayWithoutValue(value, array) {
		let newArr = [];
		for (var i = 0;  i < array.length;  ++i){
			if (!(array[i] === value)) newArr.push(array[i]);
		}
		return newArr;
	}



	function invalid(secret) {
		return context.functions.execute("secretInvalid", secret);
	}


	function checkIfMissing(requiredProperties) {
		if (anyAreMissing(requiredProperties)) throw new Error(
			`These request properties are required: ${requiredProperties.join(', ')} `
		);


		function anyAreMissing(requiredProperties) {
			for (let i = 0; i < requiredProperties.length; ++i) {
				if (properties[requiredProperties[i]] === undefined) return true;
			}
			return false;
		}
	}


};
