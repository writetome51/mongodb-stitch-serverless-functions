exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['newEmail'],

		async (props) => {
			return await context.functions.execute("updateAndReturnUser",
				props, {}, {$set: {"email": props.newEmail}}
			);
		}
	);
};
