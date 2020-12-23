exports = async function({sessionID, name}) {
	let props = arguments[0];

	try {
		var user = await context.functions.execute("getUser", props);
		return await context.functions.execute("__getLibrary", user._id, props.name);
	}
	catch (error) {
		return {error};
	}
};
