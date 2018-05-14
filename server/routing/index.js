// Config
const config = require('../../config');
// Controllers
const controllers = require('../controllers');

module.exports = (app) => {
	// Test api(get cities)
	app.get(`${config.api}/test`, controllers.getCities)
}