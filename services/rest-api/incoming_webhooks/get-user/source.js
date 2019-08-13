// This function is the webhook's request handler.
exports = async function(payload, response) {
    
    if (invalid(payload.query.secret)) return JSON.stringify({error:"invalid secret"});
    if (!(payload.query.email) || !(payload.query.password)) return JSON.stringify(
      {error:"At least 1 of the required GET parameters is missing"}
    );
    
    const email = payload.query.email, password = payload.query.password;
    const result = await context.functions.execute("getUser", email, password);
    return JSON.stringify(result);
    
    
    function invalid(secret){
      return context.functions.execute("secretInvalid", secret);
    }
}