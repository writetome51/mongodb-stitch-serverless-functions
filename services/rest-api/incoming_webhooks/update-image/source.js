exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['libraryName', 'imageIndex', 'newValue'],

		async (props) => {
			props.imageIndex += ''; // must be a string.
			if (!(props.newValue.src)) throw new Error("The image must have a 'src' property");

			return await context.functions.execute("updateAndReturnImage", props);
		}
	);
};
