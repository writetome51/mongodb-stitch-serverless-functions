// `changes`: object
// The properties in `changes` can contain dot-notation.

exports = async function({sessionID, name, changes}) {
	const {exec} = require("realm-function-exec");

	return await exec("handlePublicFunction",
		async () => {
			let user = await exec('pub_getUser', {sessionID});

			let searchCriteria = {_user_id: user._id, name}, updatingObject = {$set: changes};
			let result = await exec('updateLibrary', searchCriteria, updatingObject);

			if (result.success) {
				if (updatingObject.$set.name) searchCriteria.name = updatingObject.$set.name;
				return await exec("getLibrary", searchCriteria);
			}
		}
	);

};
