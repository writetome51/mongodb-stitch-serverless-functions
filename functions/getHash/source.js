exports = function(string) {
	const encryptedMessage = utils.crypto.hash("sha256", string);
	return encryptedMessage.toBase64();
};
