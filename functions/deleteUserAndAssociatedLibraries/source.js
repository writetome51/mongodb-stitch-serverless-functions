exports = async function(props) {

	var user = await context.functions.execute("getUser", props.sessionID);
	var result = await context.functions.execute("deleteUser", props);
	if (!(result.success)) return result;

	result = await __deleteLibraries(user._id);

	// If execution gets this far, the user was successfully deleted.
	// At this point, if no libraries are deleted it means the user had no libraries.
	// As long as result has a 'deletedCount', this was successful.
	if (result['deletedCount'] !== undefined) return {success: true};

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
