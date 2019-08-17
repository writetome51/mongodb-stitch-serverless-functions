// This function is the webhook's request handler.
exports = function(payload, response) {
	// Data can be extracted from the request as follows:

	// Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
	const {arg1, arg2} = payload.query;

	// Raw request body (if the client sent one).
	// This is a binary object that can be accessed as a string using .text()
	const body = payload.body;


	// You can use 'context' to interact with other Stitch features.
	// Accessing a value:
	// var x = context.values.get("value_name");


	// The return value of the function is sent as the response back to the client
	// when the "Respond with Result" setting is set.
	return;
};
