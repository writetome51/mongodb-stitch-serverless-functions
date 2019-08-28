exports = function(payload, requiredProperties) {

	var properties;
	if (objectEmpty(payload.query)){
	  properties = context.functions.execute("getRequestBody", payload);
	} 
	else properties = payload.query;

	try {
		errorIfMissingRequiredProperties(properties, requiredProperties);
	} catch (e) {
		return {error: e};
	}

	if (invalid(properties.secret)) return {error: {message: "invalid secret"}};
	requiredProperties = getArrayWithoutValue('secret', requiredProperties);
	removeAnyPropertiesNotRequired(properties, requiredProperties);

	return properties;
	
	
	function objectEmpty(obj){
	  return (Object.keys(obj).length === 0);
	}


	function removeAnyPropertiesNotRequired(properties, requiredProperties){
		for (let prop in properties){
			if (!(found(prop, requiredProperties))) delete properties[prop];
		}
	}


	function found(value, array){
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


	function errorIfMissingRequiredProperties(props, requiredProps) {
		if (anyAreMissing(requiredProps, props)) throw new Error(
			`These request properties are required: ${requiredProps.join(', ')} `
		);


		function anyAreMissing(requiredProps, props) {
			for (let i = 0; i < requiredProps.length; ++i) {
				if (props[requiredProps[i]] === undefined) return true;
			}
			return false;
		}
	}


};
