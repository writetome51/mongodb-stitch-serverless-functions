exports = async function(payload, response) {
	return payload.body.text();
	// return JSON.stringify(result);
};
