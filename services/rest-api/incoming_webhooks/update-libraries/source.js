exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['newValue'],

		async (props) => {
			return await context.functions.execute("updateAndReturnLibraries", props);
		}
	);
};
