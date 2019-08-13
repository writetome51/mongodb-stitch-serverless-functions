exports = async function(){
  
   var collection = context.services.get("mongodb-atlas").db("rest-api").collection("todos");
   var docs = await collection.find().toArray();
  
   return docs;
 
}