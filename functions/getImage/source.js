exports = async function(props) {
	var lib = await context.functions.execute("getImageLibrary",
		props._user_id, props.name
	);

	return lib.images[props.imageIndex];
};
