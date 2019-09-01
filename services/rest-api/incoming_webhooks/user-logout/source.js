exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		[],

		async (props) => {
			try{
				return await context.functions.execute("updateUser",
					props, {}, {$set: {loggedIn: false}}
				);
			}
			catch (e) {
				throw new Error(e.message);
			}
		}
	);
};
