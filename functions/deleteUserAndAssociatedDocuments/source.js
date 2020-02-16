exports = async function(props) {

	var user = await context.functions.execute("getUser", props.sessionID);
	var result = await context.functions.execute("deleteUser", props);
	if (!(result.success)) return result;

	return await __deleteAssociatedDocuments(user._id);


	async function __deleteAssociatedDocuments(_user_id) {

		for (let collectionName of ['image-library-app-library', 'image-library-app-image']) {
			var collection = context.functions.execute("getCollection", collectionName);

			try {
				var result = await collection.deleteMany({_user_id});
			} catch (e) {
				throw new Error(e.message);
			}
			// At this point, if no documents are deleted it means the user had no documents
			// in that collection.  Result is unsuccessful only if it doesn't have a
			// 'deletedCount' property:
			if (result['deletedCount'] === undefined) throw new Error(
				`Delete operation in collection ${collectionName} unsuccessful`
			);
		}

		return {success: true};
	}


};
