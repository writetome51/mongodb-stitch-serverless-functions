exports = async function(_user_id, name) {
	const {exec} = require("realm-function-exec");

	var images = exec("getImagesCollection");
	var image = await images.findOne({_user_id, name});
	if (!(image)) throw new Error("No such image found");

	return image;
};
