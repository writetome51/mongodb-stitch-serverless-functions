// `changes`: object
// The properties in `changes` can contain dot-notation.

exports = async function({sessionID, name, changes}) {
	return await exec("handlePublicFunction",
		async () => {
			let user = await exec('pub_getUser', {sessionID});

			let library = {_user_id: user._id, name}, updatingObject = {$set: changes};

			let result = await exec('updateLibrary', library, updatingObject);

			if (result.success) {
				if (updatingObject.$set.name) library.name = updatingObject.$set.name;

				return await exec("getLibrary", library._user_id, library.name);
			}
		}
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
