// payload.query will have the parameters here.

exports = async function(payload) {
  var properties = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, []
	);
	if (properties.error) return JSON.stringify(properties);

  // Confirm the passed email and password are both correct:
	var user = await context.functions.execute("getUser", properties.email, properties.password);
	if (user.error) return JSON.stringify(user);
	
	var result = await context.functions.execute("deleteUser", user.email, user.password);
	return JSON.stringify(result);
};
