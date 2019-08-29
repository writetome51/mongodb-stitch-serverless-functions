exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['secret', 'email', 'password'],

		async (props) => {
			return await context.functions.execute("updateAndReturnUser",
				props,
				{loggedIn: false},
				{
					$currentDate: {lastLoggedIn: true}, // sets 'lastLoggedIn' to current date-time.
					$set: {loggedIn: true}
				}
			);
		}
	);
};
