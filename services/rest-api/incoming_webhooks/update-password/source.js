exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['secret', 'email', 'password', 'newPassword'],

		async (props) => {
			props = context.functions.execute("getPropertiesAfterComparingOldAndNewPasswords", props);

			var result = await context.functions.execute("updatePassword", props);
			if (result.success) result = await context.functions.execute("getUser",
				props.email, props.newPassword
			);

			return result;
		}
	);
};
