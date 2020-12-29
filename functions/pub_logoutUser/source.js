exports = async function({sessionID}) {
	return await exec("handlePublicFunction",

		async () => {
			return await exec("updateUserAlreadyLoggedIn",
				sessionID, {}, {$set: {'loggedIn': false}}
			);
		}
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
