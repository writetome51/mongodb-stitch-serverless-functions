exports = async function({sessionID, email, password}) {
	return await exec("handlePublicFunction",
		arguments[0],

		async (props) => {
			var user = await exec("getUser", props);
			await exec("deleteUser", props);

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


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
