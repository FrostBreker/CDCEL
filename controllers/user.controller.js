const UserModel = require('../models/user.model');
const {getId} = require('../middlewares/auth.middleware');

module.exports.getUser = async (req, res) => {
	try {
		const _id = getId(req.cookies.jwt);
		if (!_id || _id === 'error')
			return res.status(401).json({message: 'Unauthorized'});
		const user = await UserModel.findById(_id).select('-password');
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
};
