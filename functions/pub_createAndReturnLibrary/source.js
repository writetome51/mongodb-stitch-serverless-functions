exports = async function({name, sessionID}) {
	let props = arguments[0];
	try {
		var user = await context.functions.execute("getUser", props);
		let lib = context.functions.execute("getNewLibraryDocument", user._id, props.name);

		let result = await context.functions.execute("insertNewLibrary", lib);
		if (result.success) return lib;
	}
	catch (error) {
		return {error};
	}
};
