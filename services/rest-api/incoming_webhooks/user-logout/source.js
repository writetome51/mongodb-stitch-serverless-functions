exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		[],

		async (props) => {
			return await context.functions.execute("updateUser",
				props, {}, {$set: {loggedIn: false}}
			);
		}
	);
};
