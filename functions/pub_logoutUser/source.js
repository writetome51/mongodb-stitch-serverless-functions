exports = async function({sessionID}) {
	return await exec("handlePublicFunction",
		arguments[0],

		async (params) => {
			return await exec("updateUserAlreadyLoggedIn",
				params.sessionID,
				{},
				{$set: {'loggedIn': false}}
			);
		}
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
