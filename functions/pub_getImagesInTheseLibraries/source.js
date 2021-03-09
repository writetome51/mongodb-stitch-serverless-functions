exports = async function({image_ids, sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",

		async () => {
			var user = await exec("getLoggedInUser", {sessionID});
			var images = exec("getImagesCollection");

			return await images.find({
				_user_id: user._id, 
				_id: {$in: image_ids}
			}).toArray();
		}
	);

};
