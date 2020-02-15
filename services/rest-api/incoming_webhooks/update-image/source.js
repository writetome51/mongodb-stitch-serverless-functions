exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['name', 'changes'],

		async (props) => {
			// 'props': {sessionID: string,  name: string,  changes: object}
			// The properties in 'changes' can contain dot-notation.

			return await context.functions.execute("updateAndReturnImage", props);
		}
	);
};
