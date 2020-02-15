// 'props': {sessionID: string,  name: string,  changes: object}

exports = async function(props) {
	let user = await context.functions.execute('getUser', props.sessionID);

	let image = {_user_id: user._id, name: props.name};

	let updatingObject = {$set: props.changes};

	// These two properties must never be changed:
	delete updatingObject['$set']['_user_id'];
	delete updatingObject['$set']['_id'];

	let result = await context.functions.execute('updateImage', image, updatingObject);

	if (result.success) {
		if (updatingObject.$set.name) image.name = updatingObject.$set.name;
		try {
			result = await context.functions.execute("getImage", image._user_id, image.name);
		} catch (e) {
			result = {error: e};
		}
	}
	return result;
};
