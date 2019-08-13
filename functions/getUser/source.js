exports = async function(email, password){
  
  var appUsers = context.functions.execute("getCollection", "image-library-app-user");
   
  try{
    var doc = await appUsers.findOne({email, password});
  }
  catch(e){
    return {error: e};
  }
  
  return doc;
}