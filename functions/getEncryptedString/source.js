exports = function(string) {
	const key = context.values.get("encrypt-key");
	const encryptedMessage = utils.crypto.encrypt("aes", string, key);
	return encryptedMessage.toBase64();
};
