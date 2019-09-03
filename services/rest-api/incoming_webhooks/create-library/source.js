exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['name'],

		async (props) => {
			var user = await context.functions.execute("getUser",
				props.email, props.password
			);
			props['_user_id'] = user._id; // cannot ever change, or relation to user document is lost.
			props['_id'] = BSON.ObjectId().toString(); // unique property, cannot ever change.

			let result = await context.functions.execute("createLibrary", props);

			if (result.success) return await context.functions.execute("getImageLibrary",
				props._user_id, props.name
			);
			else throw new Error(result);
		}
	);
};
