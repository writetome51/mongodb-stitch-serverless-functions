exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['images'],

		// props: {
		// 	sessionID: string,
		// 	images: {name, src, tags, date, description, location}[]
		// }
		async (props) => {
			return await context.functions.execute("addImages", props);
		}
	);
};
