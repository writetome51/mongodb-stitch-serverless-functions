exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['email'],

		async (props) => {
			return await  context.functions.execute("userExists", props.email);
		}
	);
};
