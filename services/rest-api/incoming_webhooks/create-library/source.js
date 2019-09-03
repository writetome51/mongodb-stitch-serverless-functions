exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['name'],

		async (props) => {
			var lib = {};
			var user = await context.functions.execute("getUser",
				props.email, props.password
			);

			lib['_user_id'] = user._id; // cannot ever change, or relation to user document is lost.
			lib['_id'] = BSON.ObjectId().toString(); // unique property, cannot ever change.
			lib['name'] = props.name;
			lib['images'] = [];

			let result = await context.functions.execute("createLibrary", lib);
			if (result.success) return await context.functions.execute("getImageLibrary",
				props._user_id, props.name
			);
			else throw new Error(result);
		}
	);


};
