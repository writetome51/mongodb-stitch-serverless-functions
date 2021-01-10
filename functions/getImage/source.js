exports = async function(searchCriteria) {
	const {exec} = require("realm-function-exec");

	var images = exec("getImagesCollection");
	var image = await images.findOne(searchCriteria);
	if (!(image)) throw new Error("No such image found");

	return image;
};
