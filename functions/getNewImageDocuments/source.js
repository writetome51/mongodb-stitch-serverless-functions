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
		if (!(image._library_id) || (!(image._library_id.length))){
			throw new Error(`One of the submitted images is missing a '_library_id' `);
		}
		if (!(image.src) || (!(image.src.length))){
			throw new Error(`One of the submitted images is missing a 'src' `);
		}
		image['_id'] = BSON.ObjectId().toString(); // unique value, cannot ever change.
		imageDocuments.push(image);
	});

	return imageDocuments;
};
