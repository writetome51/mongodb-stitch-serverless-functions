exports = async function(props) {

	var user = await context.functions.execute("getUser", props.sessionID);
	var result = await context.functions.execute("deleteUser", props);
	if (!(result.success)) return result;

	result = await __deleteLibraries(user._id);
	result = context.functions.execute("getMessageFromResult", result, 'delete');

	// If there were no libraries to delete, result will be undefined.
	if (result.success || !(result)) return {success: true};
	else return result;


	async function __deleteLibraries(_user_id) {
		var libraries = context.functions.execute("getLibrariesCollection");

		try {
			var result = await libraries.deleteMany({_user_id});
		} catch (e) {
			throw new Error(e.message);
		}
		return result;
	}


};
