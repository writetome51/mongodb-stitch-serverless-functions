exports = async function(properties) {
	var lib = await context.functions.execute("getImageLibrary", properties);
	if (lib.error) return lib;

	return lib[properties.imageIndex];
};
