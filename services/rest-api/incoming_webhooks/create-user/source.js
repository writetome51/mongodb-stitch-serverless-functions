exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		[],

		async (props) => {
			props['libraries'] = {};
			props['loggedIn'] = true;
			props['lastLoggedIn'] = $currentDate;
			let result = await context.functions.execute("createUser", props);

			if (result.success) return await context.functions.execute("getUser",
				props.email, props.password
			);
			else throw new Error(result);
		}
	);
};
