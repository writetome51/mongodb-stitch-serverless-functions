exports = async ({email}) => {
	const {exec} = require("realm-function-exec");

	try {
		// If user doesn't exist, error is triggered.
		await exec("getUserByEmail", email);
	}
	catch (error) {
		// Don't bother returning error.  {success: false} is sufficient.
		return {success: false};
	}
	return {success: true};
};
