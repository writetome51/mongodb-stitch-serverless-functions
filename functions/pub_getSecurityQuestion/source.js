exports = async function({email}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			let user = await exec("getUserByEmail", email);
			return user.securityQuestion;
		}
	);

};
