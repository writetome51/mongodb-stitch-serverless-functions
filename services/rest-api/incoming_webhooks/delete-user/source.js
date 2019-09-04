exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['email', 'password'],

		async (props) => {
			return await context.functions.execute("deleteUser", props);
		}
	);
};
