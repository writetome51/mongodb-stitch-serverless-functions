exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['name'],

		async (props) => {
			var user = await context.functions.execute("pub_getUser", props);

			return await context.functions.execute("pub_deleteLibrary",
				user._id, props.name
			);
		}
	);


};
