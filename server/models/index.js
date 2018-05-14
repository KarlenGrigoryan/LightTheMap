// MongoDb
const MongoClient = require('mongodb').MongoClient;

// Connection url
const url = 'mongodb://karlen:1234@ds159180.mlab.com:59180/mydevelopers_list';

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