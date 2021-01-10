exports = async function({sessionID, imageNames}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			var user = await exec("getLoggedInUser", {sessionID});
			var result = await deleteImagesAndRemoveFromAssociatedLibraries(user._id, imageNames);

			return exec("getMessageFromUpdateOrDeleteResult", result, 'delete');
		}
	);


	async function deleteImagesAndRemoveFromAssociatedLibraries(_user_id, imageNames) {
		var images = exec("getImagesCollection");

		var imgIDs = await get_imgIDsFrom(images);
		await removeFromLibraries(imgIDs);

		return await deleteImagesFrom(images);


		async function get_imgIDsFrom(images) {
			var imagesToDelete = await images.find({
				_user_id,
				name: {$in: imageNames}
			}).toArray();
			imagesToDelete = [].concat(imagesToDelete); // ensures it's Array prototype.

			return imagesToDelete.map((image) => image._id);
		}


		async function removeFromLibraries(imgIDs) {

			var libraries = exec("getLibrariesCollection");
			try {
				var result = await libraries.updateMany(
					// Finds any doc whose '_image_ids' array contains any item in imgIDs.
					{_user_id, _image_ids: {$in: imgIDs}},

					// Removes any item found in imgIDs from library's '_image_ids' array.
					{$pull: {'_image_ids': {$in: imgIDs}}}
				);
				if (result['matchedCount'] === 0) return;
				return exec("getMessageFromUpdateOrDeleteResult",
					result, 'update'
				);
			} catch (e) {
				throw new Error(e.message);
			}

		}


		async function deleteImagesFrom(images) {
			try {
				return await images.deleteMany({
					_user_id,
					name: {$in: imageNames}
				});
			} catch (e) {
				throw new Error(e.message);
			}
		}

	}

};
