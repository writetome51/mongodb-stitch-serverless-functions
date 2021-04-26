exports = async function({sessionID, email, password}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",

		async () => {
			var user = await exec("getLoggedInUser", {sessionID});
			password = exec("getHash", password);
			await exec("deleteUser", {sessionID, email, password});

			await __deleteAssociatedDocuments(user._id);
			return {success: true};
		}
	);


	async function __deleteAssociatedDocuments(_user_id) {

		for (let collectionName of ['image-library-app-library', 'image-library-app-image']) {
			var collection = exec("getCollection", collectionName);

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
