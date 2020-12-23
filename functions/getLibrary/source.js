exports = async function({sessionID, name}) {
	let props = arguments[0];

	try {
		var user = await context.functions.execute("getUser", props);
		return await context.functions.execute("getLibrary_private", user._id, props.name);
	}
	catch (error) {
		return {error};
	}
};
