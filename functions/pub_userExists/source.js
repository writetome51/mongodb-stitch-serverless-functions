exports = async ({email}) => {
	try {
		// If user doesn't exist, error is triggered.
		await exec("getUserByEmail", email);
	}
	catch (error) {
		// Don't bother returning error.  {success: false} is sufficient.
		return {success: false};
	}
	return {success: true};


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
