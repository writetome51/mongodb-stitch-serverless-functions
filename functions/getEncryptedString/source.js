exports = function(string) {
	key = context.values.get("encrypt-key");
	const encryptedMessage = utils.crypto.encrypt("aes", string, key);
	return encryptedMessage.toBase64();
};
