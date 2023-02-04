const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

module.exports.checkIsAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
			if (err) {
				res.sendStatus(403).json({error: 'Invalid signature'});
			} else {
				console.log(decodedToken.id);
				next();
			}
		});
	} else {
		console.log('Not connected');
	}
};

/* Here is the explanation for the code above:
1. We are exporting the getId function. This function takes a token as a parameter and returns the decodedToken.id if it is valid. Otherwise it returns null.
2. We are using the jwt.verify function to verify the token. It takes the token, the TOKEN_SECRET, and a callback function as parameters.
3. If the token is valid, the callback function will return the id. If the token is invalid, the callback function will return null. */
module.exports.getId = (token) => {
	if (token) {
		return jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
			if (err) {
				return null;
			} else {
				return decodedToken.id;
			}
		});
	} else {
		return null;
	}
};
