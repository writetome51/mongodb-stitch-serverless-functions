exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['images'],

		// props: {
		// 	sessionID: string,
		// 	images: {name, src, description, tags, date, rating, location}[]
		// }
		async (props) => {
			return await context.functions.execute("addImages", props);
		}
	);
};
