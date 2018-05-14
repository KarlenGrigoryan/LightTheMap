// Config
const config = require('../../config');
// MongoDb
const MongoClient = require('mongodb').MongoClient;

// Connection url
const url = config.db.url;

// Get Cities
exports.getCities = (cb) => {
	MongoClient.connect(url, function(err, db) {
		  // Create a collection we want to drop later
		  const col = db.collection('test');
		  col.find({}).toArray(function(err, items) {
		    cb(err, items)
		  });
		 
	});
}