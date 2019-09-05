exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['name'],

		async (props) => {
			var user = await context.functions.execute("getUser", props.sessionID);

			return await context.functions.execute("deleteLibrary", 
				user._id, props.name
			);
		}
	);


};
