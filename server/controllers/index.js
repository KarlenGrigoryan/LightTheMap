// Models
const models = require('../models');

// Get Cities
exports.getCities = (req, res) => {
    models.getCities((err, response) => {
        if (err) {
            res.status(400).send({error: err});
            return false
        }
        res.status(200).send({data: response})
    })
};

// Get cities count
exports.getCitiesCount = (req, res) => {
    models.getCitiesCount((err, response) => {
        if (err) {
            res.status(400).send({error: err});
            return false
        }
        res.status(200).send({data: response})
    })
}

// Get most popular cities
exports.getPopularCities = (req, res) => {
    models.getPopularCities((err, response) => {
        if (err) {
            res.status(400).send({error: err});
            return false
        }
        res.status(200).send({data: response})
    })
};

// Get Initiative details
exports.getnitiativeDetails = (req, res) => {
    models.getnitiativeDetails(req.query, (err, response) => {
        if (err) {
            res.status(400).send({error: err});
            return false
        }
        res.status(200).send({data: response})
    })
};

//Get Tags
exports.getTags = (req, res) => {
    models.getTags((err, response) => {
        if (err) {
            res.status(400).send({error: err});
            return false
        }
        res.status(200).send({data: response})
    })
};

// Find Initiative
exports.findInitiative = (req, res) => {
    models.findInitiative(req.body, (err, response) => {
        if (err) {
            res.status(400).send({error: err});
            return false
        }
        res.status(200).send({data: response})
    })
};


// Add Initiative
exports.addInitiative = (req, res) => {
    models.addInitiative(req.body, (err, response) => {
        if (err) {
            res.status(400).send({error: err});
            return false
        }
        if (response.result.ok == 1) {
            let resMessage = {
                message: 'User is successfully added'
            };
            res.status(200).send({data: resMessage})
        }
    })
};
