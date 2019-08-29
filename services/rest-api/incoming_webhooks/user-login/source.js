exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['secret', 'email', 'password'],

		async (props) => {
			var result = await context.functions.execute("updateUser",
				props,
				{loggedIn: false},
				{
					$currentDate: {lastLoggedIn: true}, // sets 'lastLoggedIn' to current date-time.
					$set: {loggedIn: true}
				}
			);
			if (result.success) result = await context.functions.execute("getUser",
				props.email, props.password
			);
			return result;
		}
	);
};
