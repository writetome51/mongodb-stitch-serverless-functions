// 'props': {sessionID: string,  name: string,  changes: object}

exports = async function(_user_id, imagesToChange) {

	for (let imageToChange of imagesToChange) {
		var result = await context.functions.execute("updateImage",
			_user_id, imageToChange.name, imageToChange.changes
		);
	}
	return {success: true};
};
