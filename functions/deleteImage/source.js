// Returns:  {success: true} | {error: {message: string}} | {error: any}

exports = async function(properties) {
	// properties = {email:string, password:string, libraryName: string, imageIndex: number}

	var library = await context.functions.execute("getImageLibrary", properties);
	if (!(library)) return {error: {message: "No such library found"}};

	library.splice(properties.imageIndex, 1);  // removes imageIndex.

	var result = await context.functions.execute(
		"updateProperty", properties, ('libraries.' + properties.libraryName), library
	);
	return context.functions.execute("getMessageFromResult", result, 'update');
};
