// Config
const config = require('../../config');
// Controllers
const controllers = require('../controllers');

module.exports = (app) => {
	// Test api(get cities)
	app.get(`${config.api}/get-cities`, controllers.getCities);
	
	// Get most popular cities
	app.get(`${config.api}/get-popular-cities`, controllers.getPopularCities);

	// Find Initiative
	app.get(`${config.api}/find-initiative`, controllers.findInitiative)
}