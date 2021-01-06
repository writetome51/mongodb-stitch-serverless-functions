exports = async function(getImagesFunction, dataTotal) {
	var images = await getImagesFunction();

	return {
		dataTotal,
		batch: images
	};

};
