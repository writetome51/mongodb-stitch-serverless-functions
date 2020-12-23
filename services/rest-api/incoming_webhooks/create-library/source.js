exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['name'],

		async (props) => {
			return await context.functions.execute("pub_createAndReturnLibrary", props);
		}
	);


};
