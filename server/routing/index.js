// Config
const config = require('../../config');
// Controllers
const controllers = require('../controllers');

module.exports = (app) => {
    // Get cities
    app.get(`${config.api}/get-cities`, controllers.getCities);

    // Get citites count
    app.get(`${config.api}/get-cities-count`, controllers.getCitiesCount)

    // Get most popular cities
    app.get(`${config.api}/get-popular-cities`, controllers.getPopularCities);

    // Get Initiative details
    app.get(`${config.api}/get-initiative-details`, controllers.getnitiativeDetails);

    // Get tags
    app.get(`${config.api}/get-tags`, controllers.getTags);

    // Find Initiative
    //app.get(`${config.api}/find-initiative`, controllers.findInitiative);
    app.post(`${config.api}/find-initiative`, controllers.findInitiative);

    // Add Initiative
    app.post(`${config.api}/add-initiative`, controllers.addInitiative)

};