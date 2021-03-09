// search images not in any library...
// `image_ids`: ids of images who belong to libraries.
// Function will return images whose ids aren't found in `image_ids`

exports = async function({image_ids, sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",

		async () => {
			var user = await exec("getLoggedInUser", {sessionID});
			var images = exec("getImagesCollection");

			return await images.find({
				_user_id: user._id, 
				_id: {$notIn: image_ids}
			}).toArray();
		}
	);

};
