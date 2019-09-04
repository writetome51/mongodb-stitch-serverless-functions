exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['name'],

		async (props) => {
			var user = await context.functions.execute("getUser", props.sessionID);

			var lib = {
				_id:  BSON.ObjectId().toString(), // unique property, cannot ever change.
				_user_id: user._id, // cannot ever change, or relation to user document is lost.
				name: props.name,
				images: []
			};

			let result = await context.functions.execute("createLibrary", lib);
			if (result.success) return await context.functions.execute("getLibrary",
				lib._user_id, lib.name
			);
			else throw new Error(result);
		}
	);


};
