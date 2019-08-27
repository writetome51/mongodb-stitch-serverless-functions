exports = async function(payload) {
	var props = context.functions.execute(
		"getPropertiesPreppedForQuerying", payload, ['secret', 'email', 'password']
	);
	if (props.error) return JSON.stringify(props);

	props['libraries'] = {};

	let result = await context.functions.execute("createUser", props);
	if (result.success) result = await context.functions.execute(
		"getUser", props.email, props.password
	);
	return JSON.stringify(result);
};
