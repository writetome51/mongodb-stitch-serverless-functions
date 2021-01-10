exports = async function({images, sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			let user = await exec("getLoggedInUser", {sessionID});

			for (let i = 0, length = images.length; i < length; ++i) {
				await exec("updateImage", user._id, images[i]);
			}
			return {success: true};
		}
	);
};
