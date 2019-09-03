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

			removeAnyPropertiesNotRequired(props, ['_id', '_user_id', 'name', 'images']);

			let result = await context.functions.execute("createLibrary", props);

			if (result.success) return await context.functions.execute("getImageLibrary",
				props._user_id, props.name
			);
			else throw new Error(result);
		}
	);


	function removeAnyPropertiesNotRequired(properties, requiredProperties) {
		for (let prop in properties) {
			if (!(found(prop, requiredProperties))) delete properties[prop];
		}


		// Necessary because Array.includes() is not supported in MongoDB Stitch.

		function found(value, array) {
			for (var i = 0; i < array.length; ++i) {
				if (array[i] === value) return true;
			}
			return false;
		}
	}


};
