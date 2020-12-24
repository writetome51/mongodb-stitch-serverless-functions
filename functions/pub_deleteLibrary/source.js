exports = async function({name, sessionID}) {
	return await exec("handlePublicFunction",
		arguments[0],

		async (props) => {
			var user = await exec("getUser", props);

			var result = await __deleteLibrary(props.name, user._id);
			return exec("getMessageFromUpdateOrDeleteResult", result, 'delete');
		}
	);


	async function __deleteLibrary(name, _user_id) {
		var libraries = exec("getLibrariesCollection");
		return await libraries.deleteOne({_user_id, name});
	}


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
