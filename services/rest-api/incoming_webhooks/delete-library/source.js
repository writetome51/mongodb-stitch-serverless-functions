exports = async function(payload) {
	  var props = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password', 'libraryName']
	);
	if (props.error) return JSON.stringify(props);
	
	var result = await context.functions.execute(
		"deleteLibrary", props.email, props.password, props.libraryName
	);
	return JSON.stringify(result);
};
