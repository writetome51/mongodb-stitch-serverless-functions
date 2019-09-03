exports = async function(props) {
	var lib = await context.functions.execute("getLibrary",
		props._user_id, props.name
	);

	return lib.images[props.imageIndex];
};
