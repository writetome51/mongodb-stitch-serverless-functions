// 'props': {sessionID: string,  name: string,  changes: object}

exports = async function(props) {
	let user = await context.functions.execute('getUser', props.sessionID);

	let searchCriteria = {_user_id: user._id, name: props.name};

	let updatingObject = {$set: props.changes};

	// These two properties must never be changed:
	delete updatingObject['$set']['_user_id'];
	delete updatingObject['$set']['_id'];

	return await context.functions.execute("updateDocument",
		"image-library-app-image", searchCriteria, updatingObject
	);
};
