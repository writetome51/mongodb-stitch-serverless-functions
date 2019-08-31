exports = async function(payload) {
	return await context.functions.execute("processRequest",
		payload,
		['newPassword'],

		async (props) => {
			props = context.functions.execute("getPropertiesAfterComparingOldAndNewPasswords", props);

			return await context.functions.execute("updatePasswordAndReturnUser", props);
		}
	);
};
