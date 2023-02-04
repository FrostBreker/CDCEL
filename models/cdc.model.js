const mongoose = require('mongoose');

const CDCSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		postedBy: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		ISBN13: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const CDCModel = mongoose.model('CDCs', CDCSchema);

module.exports = CDCModel;
