exports = async function({name, sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			var user = await exec("getLoggedInUser", {sessionID});
			var {_image_ids} = await exec("getLibrary", {_user_id: user._id, name});

			return {dataTotal: _image_ids.length};
		}
	);
};
