// 'props': {email: string, password:string, name: string, changes: object}

exports = async function(props) {
	let user = await context.functions.execute('getUser', props.email, props.password);

	let library = {_user_id: user._id, name: props.name};

	let updatingObject = {$set: props.changes};

	// These two properties must never be changed:
	delete updatingObject['$set']['_user_id'];
	delete updatingObject['$set']['_id'];

	let result = await context.functions.execute('updateLibrary', library, updatingObject);

	if (result.success){
		if (updatingObject.$set.name) library.name = updatingObject.$set.name;
		result = await context.functions.execute("getImageLibrary",
			library._user_id, library.name
		);
	}
	return result;
};
