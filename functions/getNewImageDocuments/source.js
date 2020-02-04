exports = function(images) {
	let imageDocuments = [];
	/*********
	 each object in images:
	 	{
	 	    _library_id: string,  name: string,  src: string,  tags: string[],
		    description: string,  location: string
		}
		but no _id!!  The _id will be added below.
	 **********/
	images.forEach((image) => {
		image['_id'] = BSON.ObjectId().toString(); // unique value, cannot ever change.
		imageDocuments.push(image);
	});

	return imageDocuments;
};
