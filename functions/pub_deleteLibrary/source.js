exports = async function({name, sessionID}) {
	let props = arguments[0];
	try {
		var user = await context.functions.execute("getUser", props);

		var result = await __deleteLibrary(props.name, user._id);
		return context.functions.execute("getMessageFromUpdateOrDeleteResult", result, 'delete');
	} catch (error) {
		return {error};
	}


	async function __deleteLibrary(name, _user_id) {
		var libraries = context.functions.execute("getLibrariesCollection");
		return await libraries.deleteOne({_user_id, name});
	}


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
