exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['secret', 'email', 'password', 'libraryName', 'newValue'],

		async (props) => {
			return await context.functions.execute("updateAndReturnLibrary", props);
		}
	);
};
