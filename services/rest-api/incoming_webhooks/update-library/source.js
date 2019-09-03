exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['name', 'changes'],

		async (props) => {
			// 'props': {email: string, password:string, name: (libraryName), changes: object}

			return await context.functions.execute("updateAndReturnLibrary", props);
		}
	);
};
