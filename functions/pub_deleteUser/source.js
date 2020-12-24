exports = async function({sessionID, email, password}) {
	let props = arguments[0];
	try {
		var user = await context.functions.execute("pub_getUser", props);
		await context.functions.execute("deleteUser", props);

		await __deleteAssociatedDocuments(user._id);
		return {success: true};
	}
	catch (error) {
		return {error};
	}


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
	}


};
