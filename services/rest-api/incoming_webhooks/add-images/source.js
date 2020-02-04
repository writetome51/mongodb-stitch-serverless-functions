exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['images'],

		// props: { sessionID: string,  images: object[] }
		async (props) => {
			return await context.functions.execute("addImages", props.sessionID);
		}
	);
};
