// `params`: object

exports = async function(params, func) {
	try {
		return await func(params);
	}
	catch (error) {
		return {error};
	}
};
