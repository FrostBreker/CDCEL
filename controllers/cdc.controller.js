const {getId} = require('../middlewares/auth.middleware');
const CDCModel = require('../models/cdc.model');

// Get all the CDCs for this user for a specific book
// This function is used to display all the CDCs for a specific book
// It is used in the BookDetails page
// It is used in the BookDetails component

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

// Creates a new CDC for the given user
// req - the request object
// res - the response object
// Returns a 201 status code if the CDC is successfully created
// Returns a 400 status code if the CDC is not successfully created

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

//This function is used to update a CDC in the database.
//The function takes in the request and response as parameters.
//It first gets the user's id from the jwt.
//Then it finds the CDC with the given id and updates it with the new text.
//Finally, it sends the response back to the client.

module.exports.updateCDC = async (req, res) => {
	try {
		const _id = getId(req.cookies.jwt);
		await CDCModel.findOneAndUpdate(
			{_id: req.body._id, userId: _id},
			{
				$set: {
					text: req.body.text,
				},
			},
			{new: true, upsert: true, setDefaultsOnInsert: true},
			(err, docs) => {
				if (!err) return res.status(200).send(docs);
				if (err) return res.status(500).send({message: err});
			},
		).clone();
	} catch (error) {
		res.status(500).json({message: error.message});
	}
};

// This function deletes a CDC by its ID and the ID of the user who created it.
// It returns the CDC that was deleted.
// The ID of the user is the ID of the user whose JWT was used to make the request.

module.exports.deleteCDC = async (req, res) => {
	// Get the ID of the user from the JWT
	const _id = getId(req.cookies.jwt);
	// Find the CDC with the CDC ID and the user ID
	const CDC = await CDCModel.findOneAndDelete({
		_id: req.params.cdcId,
		userId: _id,
	});
	// Send the CDC back to the user
	res.status(200).send(CDC);
};
