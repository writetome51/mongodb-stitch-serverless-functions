exports = async function(_user_id, batchSize, batchNumber) {

	return await exec("getBatchOfImages",

		async function() {
			let imagesCollection = exec("getImagesCollection");
			return await imagesCollection.find({_user_id}).sort({_id: 1}).toArray();
		},

		batchSize,
		batchNumber
	);


	function exec(funcName, ...args) {
		return context.functions.execute(funcName, ...args);
	}

};
