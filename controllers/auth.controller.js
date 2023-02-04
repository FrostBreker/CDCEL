const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const maxAge = 99 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
	return jwt.sign({id}, process.env.TOKEN_SECRET, {
		expiresIn: maxAge,
	});
};

module.exports.signIn = async (req, res) => {
	try {
		const {username, password} = req.body;
		const user = await UserModel.login(username, password);
		const token = createToken(user._id);
		res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge});
		res.status(200).send({user: user._id});
	} catch (err) {
		res.status(500).json({message: err.message});
	}
};

module.exports.signUp = async (req, res) => {
	try {
		const {username, password, companyName} = req.body;
		const user = await UserModel.findOne({username});
		if (user) {
			const token = createToken(user._id);
			res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge});
			res.status(201).send({user: user._id});
		} else {
			const user = await UserModel.create({username, password, companyName});
			const token = createToken(user._id);
			res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge});
			res.status(201).send({user: user._id});
		}
	} catch (err) {
		res.status(500).json({message: err.message});
	}
};

module.exports.logout = (req, res) => {
	res.cookie('jwt', '', {maxAge: 1});
	res.redirect('/');
};
