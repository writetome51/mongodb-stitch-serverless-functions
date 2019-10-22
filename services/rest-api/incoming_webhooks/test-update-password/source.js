exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['email', 'password', 'newPassword'],

		async (props) => {
			props = context.functions.execute("getPropertiesAfterComparingOldAndNewPasswords", props);

			return await context.functions.execute("updateAndReturnUser",
				props,
				{
					email: props.email,
					password: props.password
				},
				{$set: {"password": props.newPassword}}
			);

			/********
			return await context.functions.execute("updatePasswordAndReturnUser", props);
			 ********/
		}
	);

};
