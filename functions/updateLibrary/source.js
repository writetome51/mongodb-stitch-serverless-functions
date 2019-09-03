// 'library': {_user_id: string, name: string}

exports = async function(library, updatingObject) {
	var libraries = context.functions.execute("getLibrariesCollection");

	var result = await libraries.updateOne(library, updatingObject);

	try{
		result = context.functions.execute("getMessageFromResult", result, 'update');
	}
	catch (e) {
		throw new Error(e.message);
	}
	return result;
};
