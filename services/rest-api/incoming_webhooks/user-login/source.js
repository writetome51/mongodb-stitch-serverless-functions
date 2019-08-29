exports = async function(payload) {
	context.functions.execute("processRequest", 
		payload,
		['secret', 'email', 'password'],

		(users, props) => {
			var result = await users.updateOne(
				{email: props.email, password: props.password, loggedIn: false},
				{
					$currentDate: {lastLoggedIn: true}, // sets 'lastLoggedIn' to current date-time.
					$set: {loggedIn: true}
				}
			);
			result = context.functions.execute("getMessageFromResult", result, 'update');
			if (result.success) result = await context.functions.execute("getUser", props.email, props.password);
			
			return result;			
		}
	);
};
