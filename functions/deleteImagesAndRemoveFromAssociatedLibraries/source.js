exports = async function(_user_id, imageNames) {

	var result = await __deleteImagesAndRemoveFromAssociatedLibraries(_user_id, imageNames);
	return context.functions.execute("getMessageFromUpdateOrDeleteResult", result, 'delete');


	async function __deleteImagesAndRemoveFromAssociatedLibraries(_user_id, imageNames) {

		var images = context.functions.execute("getImagesCollection");

		var imgIDs = get_imgIDsFrom(images);
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
			var libraries = context.functions.execute("getLibrariesCollection");
			try {
				var result = await libraries.updateMany(
					{_user_id},

					// Removes any item found in imgIDs from library's '_image_ids' array.
					{$pull: {'_image_ids': {$in: imgIDs}}}
				);
				return context.functions.execute("getMessageFromUpdateOrDeleteResult", result, 'update');
			}
			catch (e) {
				throw new Error(e.message);
			}

		}


		async function deleteImagesFrom(images) {
			try {
				result = await images.deleteMany({
					_user_id,
					name: {$in: imageNames}
				});
			} catch (e) {
				throw new Error(e.message);
			}
			return result;
		}


	}


};
