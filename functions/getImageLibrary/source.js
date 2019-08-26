exports = async function(properties) {
	var user = await getUser(properties.email, properties.password);
	if (user.error) return user;

	return user.libraries[properties.libraryName];
};
