exports = async function({email}) {
	try {
		let user = await context.functions.execute("getUserByEmail", email);
		return user.securityQuestion;
	}
	catch (error) {
		return {error};
	}
};
