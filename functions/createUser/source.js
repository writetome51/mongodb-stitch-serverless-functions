exports = async function(doc) {
  
  var appUsers = context.functions.execute("getCollection", "image-library-app-user");
  
  try{
    var result = await appUsers.insertOne(doc);
  }
  catch(e){
    return {error: e};
  }
  
  // If insert was successful, result will contain 'insertedId'.
  if (result.insertedId) return {success: true};
  
  // Just in case the insert was performed without error,
  // but the result was not what we wanted:
  return {error: result};
}