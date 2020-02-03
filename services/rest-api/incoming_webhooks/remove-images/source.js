exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['name', 'images'],

		async (props) => {
			// 'props': {
			// 			  sessionID: string, name: (libraryName), images: array of indexes to remove
			// 			}

			// Give all images to be removed a unique value, which they can be pulled by:
			var imagesToRemove = {};
			var valueToRemove = "ToBePulled_" + new Date().toString(); // unique value.

			for (let i = 0; i < props.images.length; ++i) {
				imagesToRemove['images.' + props.images[i]] = valueToRemove;
			}
			let updatingObject = {$set: imagesToRemove};
			let user = await context.functions.execute('getUser', props.sessionID);
			let library = {_user_id: user._id, name: props.name};

			// perform the update and pull in one operation:
			let result = await context.functions.execute('updateLibrary',
				library, updatingObject, {images: valueToRemove}
			);
			if (result.success) {
				try {
					result = await context.functions.execute("getLibrary",
						library._user_id, library.name
					);
				} catch (e) {
					result = {error: e};
				}
			}
			return result;
		}
	);
};
