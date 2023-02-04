const {getId} = require('../middlewares/auth.middleware');
const CDCModel = require('../models/cdc.model');

module.exports.getCDCs = async (req, res) => {
	try {
		const bookISBN13 = req.params.isbn;
		const _id = getId(req.cookies.jwt);
		const CDCs = await CDCModel.find({
			ISBN13: bookISBN13,
			userId: _id,
		});
		res.status(200).send(CDCs);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
};

module.exports.createCDC = async (req, res) => {
	try {
		const _id = getId(req.cookies.jwt);
		const CDC = await CDCModel.create({
			userId: _id,
			postedBy: req.body.postedBy,
			text: req.body.text,
			ISBN13: req.body.ISBN13,
		});
		res.status(201).send(CDC);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
};

module.exports.updateCDC = async (req, res) => {
	try {
		const _id = getId(req.cookies.jwt);
		const CDC = await CDCModel.findOneAndUpdate(
			{
				_id: req.body.cdcId,
				userId: _id,
			},
			{
				text: req.body.text,
			},
			{
				new: true,
			},
		);
		res.status(200).send(CDC);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
};

module.exports.deleteCDC = async (req, res) => {
	try {
		const _id = getId(req.cookies.jwt);
		const CDC = await CDCModel.findOneAndDelete({
			_id: req.params.cdcId,
			userId: _id,
		});
		res.status(200).send(CDC);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
};
