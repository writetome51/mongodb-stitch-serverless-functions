exports = function() {
	const {exec} = require("realm-function-exec");
	return exec("getCollection", "image-library-app-image");
};
