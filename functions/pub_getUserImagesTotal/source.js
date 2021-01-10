// returns: {dataTotal: integer}

exports = async function({sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			let user = await exec("getLoggedInUser", {sessionID});
			let imagesCollection = exec("getImagesCollection");

			return await exec("getMatchedCount", imagesCollection, {_user_id: user._id});
		}
	);
};
