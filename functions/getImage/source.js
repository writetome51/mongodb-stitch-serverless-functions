exports = async function(_user_id, name) {
	const {exec} = require("realm-function-exec");

	try {
		var image = await __getImage();
	} catch (e) {
		throw new Error(e.message);
	}
	return image;


	async function __getImage() {
		var images = exec("getImagesCollection");
		var image = await images.findOne({_user_id, name});

		if (!(image)) throw new Error("No such image found");

		return image;
	}
};
