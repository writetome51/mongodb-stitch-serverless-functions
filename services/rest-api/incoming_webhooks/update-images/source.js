exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['images'],

		async (props) => {
			// 'props': {sessionID: string,  images: ImageToChange[]}
			// ImageToChange = {
			//      name: name of image being updated;
			//      changes: object
			// }
			// The properties in 'changes' can contain dot-notation.

			let user = await context.functions.execute('getUser', props.sessionID);

			return await context.functions.execute("updateImages", user._id, props.images);
		}
	);
};
