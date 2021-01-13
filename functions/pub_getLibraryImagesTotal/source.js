exports = async function({name, sessionID}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			var user = await exec("getLoggedInUser", {sessionID});
			var lib = await exec("getLibrary", {_user_id: user._id, name});
			var _image_ids = convertedToArray(lib._image_ids)
			return {dataTotal: _image_ids.length};


			function convertedToArray(arr) {
				return [].concat(arr);
			}
		}
	);
};
