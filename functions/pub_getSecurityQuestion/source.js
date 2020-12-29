exports = async function({email}) {
	return await exec("handlePublicFunction",

		async () => {
			let user = await exec("getUserByEmail", email);
			return user.securityQuestion;
		}
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
