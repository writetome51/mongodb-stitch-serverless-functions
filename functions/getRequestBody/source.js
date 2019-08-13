exports = function(payload){
    var body = payload.body.text();
    return JSON.parse(body);
};