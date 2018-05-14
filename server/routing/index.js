// Controllers
const controllers = require('../controllers');

module.exports = (app) => {
	// Test api(get cities)
	app.get('/api/test', controllers.getCities)
}