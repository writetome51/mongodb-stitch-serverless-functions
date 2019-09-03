exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['libraryName'],

		async (props) => {
			return await context.functions.execute("getLibrary", props);
		}
	);
};
