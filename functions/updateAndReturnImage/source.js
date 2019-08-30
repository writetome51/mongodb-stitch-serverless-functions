exports = async function(props) {
	let updatingObject = {$set: {}};
	updatingObject['$set'][`libraries.${props.libraryName}.${props.imageIndex}`] = props.newValue;

	var user = await context.functions.execute("updateAndReturnUser",
		props, {}, updatingObject
	);

	return user.libraries[props.libraryName][props.imageIndex];
};
