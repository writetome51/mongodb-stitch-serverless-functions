exports = function(secret){
  return (secret !== context.values.get("super-secret"));
};