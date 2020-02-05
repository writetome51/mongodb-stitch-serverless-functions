exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['name', 'images'],

		async (props) => {
			// 'props': {
			// 			  sessionID: string, name: (libraryName), images: array of _image_ids to remove
			// 			}

			//...code...

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
