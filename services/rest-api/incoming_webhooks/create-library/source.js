// This function is the webhook's request handler.
exports = async function(payload, response) {
  
  var body = context.functions.execute("getRequestBody", payload);
  
  if (invalid(body.secret)) return JSON.stringify({error: "invalid secret"});
  if (!(body.email) || !(body.password) || !(body.library)) return JSON.stringify(
    {error:"At least 1 of the required PATCH parameters is missing"}
  );
  
  // new document must have email and password so createLibrary() can verify
  // user identity.
  const newLibrary = {email: body.email, password: body.password, library: body.library};
  var result = await context.functions.execute("createLibrary", newLibrary);
  return JSON.stringify(result);
  
  
  function invalid(secret){
    return context.functions.execute("secretInvalid", secret);
  }
   
}