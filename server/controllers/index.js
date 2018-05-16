// Models
const models = require('../models');

// Get Cities
exports.getCities = (req, res) => {
	models.getCities((err, response) => {
		if(err) {
			res.status(404).send({error: err});
			return false
		}
	   	res.status(200).send({data: response})
	})
};

// Get most popular cities
exports.getPopularCities = (req, res) => {
	models.getPopularCities((err, response) => {
		if(err) {
			res.status(404).send({error: err});
			return false
		}
	   	res.status(200).send({data: response})
	})
};

exports.findInitiative = (req, res) => {
	models.findInitiative(req.query, (err, response) => {
		if(err) {
			res.status(404).send({error: err});
			return false
		}
	   	res.status(200).send({data: response})
	})
}

