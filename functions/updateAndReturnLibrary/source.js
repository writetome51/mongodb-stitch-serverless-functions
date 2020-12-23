// 'props': {sessionID: string, name: string, changes: object}

exports = async function(props) {
	let user = await context.functions.execute('getUser', props.sessionID);

	let library = {_user_id: user._id, name: props.name};

	let updatingObject = {$set: props.changes};

	let result = await context.functions.execute('updateLibrary', library, updatingObject);

	if (result.success) {
		if (updatingObject.$set.name) library.name = updatingObject.$set.name;
		try {
			result = await context.functions.execute("_getLibrary",
				library._user_id, library.name
			);
		} catch (e) {
			result = {error: e};
		}
	}
	return result;
};
