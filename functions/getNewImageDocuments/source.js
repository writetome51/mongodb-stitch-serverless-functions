exports = function(images, user_id) {
	let imageDocuments = [];

	/*********
	 each object in images:
	 	{
	 	    name: string,  src: string,  tags: string[], date: Date,
		    description: string,  location: string
		}
		but no _id or _user_id.  They will be added below.
	 **********/

	images.forEach((image) => {
		if (!(image.src) || (!(image.src.length))){
			throw new Error(`One of the submitted images is missing a 'src' `);
		}
		if (!(image.name) || (!(image.name.length))){
			throw new Error(`One of the submitted images is missing a 'name' `);
		}
		image['_id'] = BSON.ObjectId().toString(); // unique value, cannot ever change.
		image['_user_id'] = user_id;
		imageDocuments.push(image);
	});

	return imageDocuments;
};
